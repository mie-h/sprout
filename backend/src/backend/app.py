from __future__ import annotations

import json
from http import HTTPStatus
from typing import TYPE_CHECKING, Any, cast

import asyncpg
import uvicorn
import uvicorn.config
from authlib.integrations.starlette_client import (  # type: ignore [reportMissingTypeStubs]
    OAuth,
    OAuthError,
)
from fastapi import Depends, FastAPI, HTTPException
from loguru import logger
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import HTMLResponse, RedirectResponse

_GOOGLE_CLIENT_ID = ""
_GOOGLE_CLIENT_SECRET = ""

if TYPE_CHECKING:
    from asyncpg import Record
    from asyncpg.pool import Pool
    from starlette.requests import Request


async def main():
    async with asyncpg.create_pool(
        user="postgres",
        database="guestbook",
        host="34.31.63.157",
    ) as pool:
        server = uvicorn.Server(
            uvicorn.Config(build_fastapi(pool), host="127.0.0.1", port=8000)
        )
        await server.serve()


def build_fastapi(pool: Pool[Record]):
    app = FastAPI()
    app.add_middleware(SessionMiddleware, secret_key="!secret")

    oauth = OAuth()

    CONF_URL = "https://accounts.google.com/.well-known/openid-configuration"
    oauth.register(  # type: ignore
        name="google",
        server_metadata_url=CONF_URL,
        client_id=_GOOGLE_CLIENT_ID,
        client_secret=_GOOGLE_CLIENT_SECRET,
        client_kwargs={"scope": "openid email profile"},
    )

    @app.get("/api")
    async def homepage(request: Request):
        user = request.session.get("user")
        if user:
            data = json.dumps(user)
            html = f"<pre>{data}</pre>" '<a href="/api/logout">logout</a>'
            return HTMLResponse(html)
        return HTMLResponse('<a href="/api/login">login</a>')

    del homepage

    @app.get("/api/login")
    async def login(request: Request):
        redirect_uri = request.url_for("auth")
        redirect_uri = "http://localhost:3000/api/auth"
        logger.info("redirect_uri: {}", redirect_uri)
        return cast(
            RedirectResponse,
            await oauth.google.authorize_redirect(request, redirect_uri),  # type: ignore
        )

    del login

    @app.get("/api/auth")
    async def auth(request: Request):
        print("/auth: request: ", request.url)

        try:
            token = cast(dict[Any, Any], await oauth.google.authorize_access_token(request))  # type: ignore
        except OAuthError as error:
            print(error.error, cast(str, error.description))  # type: ignore
            return HTMLResponse(f"<h1>{error.error}</h1>")
        user = token.get("userinfo")
        if user:
            request.session["user"] = dict(user)
        print(f"user: {user}")
        return RedirectResponse(url="/")

    del auth

    @app.get("/api/logout")
    async def logout(request: Request):
        request.session.pop("user", None)
        return RedirectResponse(url="/api")

    del logout

    def get_user_id(request: Request):
        user = request.session.get("user")
        if not user:
            raise HTTPException(HTTPStatus.UNAUTHORIZED.value, "User not logged in")
        return str(user.get("sub"))

    @app.get("/api/tasks")
    async def get_tasks(user_id: str = Depends(get_user_id)):
        del user_id
        return [{"id": 1, "title": "Buy Milk"}, {"id": 2, "title": "Buy Bread"}]

    del get_tasks

    return app

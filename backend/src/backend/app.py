import json
from http import HTTPStatus
from typing import Annotated

from authlib.integrations.starlette_client import OAuth, OAuthError
from fastapi import Depends, FastAPI, HTTPException
from loguru import logger

# from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware
from starlette.requests import Request
from starlette.responses import HTMLResponse, RedirectResponse

# from .config import (  # TODO: get credentials from command line
#     GOOGLE_CLIENT_ID,
#     GOOGLE_CLIENT_SECRET,
# )
GOOGLE_CLIENT_ID = ""
GOOGLE_CLIENT_SECRET = ""

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="!secret")

oauth = OAuth()

CONF_URL = "https://accounts.google.com/.well-known/openid-configuration"
oauth.register(
    name="google",
    server_metadata_url=CONF_URL,
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
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


@app.get("/api/login")
async def login(request: Request):
    redirect_uri = request.url_for("auth")
    redirect_uri = "http://localhost:3000/api/auth"
    logger.info("redirect_uri: {}", redirect_uri)
    return await oauth.google.authorize_redirect(request, redirect_uri)


@app.get("/api/auth")
async def auth(request: Request):
    print("/auth: request: ", request.url)

    try:
        token = await oauth.google.authorize_access_token(request)
    except OAuthError as error:
        print(error.error, error.description)
        return HTMLResponse(f"<h1>{error.error}</h1>")
    user = token.get("userinfo")
    if user:
        request.session["user"] = dict(user)
    print(f"user: {user}")
    return RedirectResponse(url="/")


@app.get("/api/logout")
async def logout(request: Request):
    request.session.pop("user", None)
    return RedirectResponse(url="/login")


def get_user_id(request: Request):
    user = request.session.get("user")
    if not user:
        raise HTTPException(HTTPStatus.UNAUTHORIZED.value, "User not logged in")
    return str(user.get("sub"))


@app.get("/api/tasks")
async def get_tasks(user_id: Annotated[str, Depends(get_user_id)]):
    del user_id
    return [{"id": 1, "title": "Buy Milk"}, {"id": 2, "title": "Buy Bread"}]


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)

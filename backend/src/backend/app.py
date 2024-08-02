import os
import json
from contextlib import asynccontextmanager
from http import HTTPStatus
from typing import Annotated, Optional

from pydantic import BaseModel, Field
import asyncpg
from authlib.integrations.starlette_client import OAuth, OAuthError
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse
from loguru import logger
import openai
# from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware
from starlette.requests import Request
from starlette.responses import HTMLResponse, RedirectResponse


# TODO: Create a dedicated configuration file to load the environment variables
#       and import them here
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# default values are provided for local development
DATABASE_URL = (
    "postgresql://"
    f"{os.getenv('POSTGRES_USERNAME', 'postgres')}"
    f":{os.getenv('POSTGRES_PASSWORD', 'postgres')}"
    f"@{os.getenv('POSTGRES_HOSTNAME', 'db')}"  # container name in docker-compose
    f":{os.getenv('POSTGRES_PORT', 5432)}"
    f"/{os.getenv('POSTGRES_DATABASE', 'postgres')}"
)


db_pool: Optional[asyncpg.pool.Pool] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global db_pool
    db_pool = await asyncpg.create_pool(DATABASE_URL)
    yield
    await db_pool.close()


app = FastAPI(lifespan=lifespan)
app.add_middleware(SessionMiddleware, secret_key="!secret")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# override the default status for malformed request payload 422 -> 400
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return PlainTextResponse(str(exc), status_code=400)

oauth = OAuth()

CONF_URL = "https://accounts.google.com/.well-known/openid-configuration"
oauth.register(
    name="google",
    server_metadata_url=CONF_URL,
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    client_kwargs={"scope": "openid email profile"},
)


# Dependency to get the database connection
async def get_db_connection():
    async with db_pool.acquire() as connection:
        yield connection


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


# Open AI chat
openai.api_key = OPENAI_API_KEY 


# Pydantic models for request and response
class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)


class ChatResponse(BaseModel):
    response: str


@app.post("/api/chat", response_model=ChatResponse, status_code=status.HTTP_200_OK)
async def chat(chat_request: ChatRequest):
    user_message = chat_request.message

    # Prepend instruction to prompt for a brief response
    prompt = f"Please respond in a brief phrase: {user_message}"

    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "user", "content": prompt}
            ],
        max_tokens=25,  # Limit the number of tokens in the response
        stop=["\n"],     # Optionally, specify a stop sequence
    )

    chat_message = response.choices[0].message.content
    print(chat_message)
    return ChatResponse(response=chat_message)


# just to demonstrate the db connection
# TODO: Remove this endpoint once we have the actual endpoints
# ref: https://magicstack.github.io/asyncpg/current/api/index.html#asyncpg.connection.Connection
@app.get("/test-db")
async def test_db(conn=Depends(get_db_connection)):
    assert not conn.is_closed()
    try:
        result = await conn.fetch("SELECT * FROM database_that_does_not_exist")
    except asyncpg.exceptions.UndefinedTableError as err:
        result = str(err)
    assert result == 'relation "database_that_does_not_exist" does not exist'
    return {"result": result}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
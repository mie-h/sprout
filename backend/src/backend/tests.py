import asyncpg
import pytest
from fastapi.testclient import TestClient

from backend.app import app, DATABASE_URL


client = TestClient(app)


@pytest.mark.asyncio
async def test_db_connection():
    # create a connection pool
    app.state.pool = await asyncpg.create_pool(DATABASE_URL)

    async with app.state.pool.acquire() as conn:
        assert not conn.is_closed()
        with pytest.raises(asyncpg.exceptions.UndefinedTableError) as exc_info:
            await conn.fetch("SELECT * FROM database_that_does_not_exist")
        assert (
            exc_info.value.args[0]
            == 'relation "database_that_does_not_exist" does not exist'
        )

    # close the connection pool
    await app.state.pool.close()


def test_login():
    # FIXME: Add tests
    pass


def test_logout():
    # FIXME: Add tests
    pass


def test_list_tasks_unauthorized_user():
    response = client.get("/api/tasks")
    assert response.status_code == 401
    assert response.json() == {"detail": "User not logged in"}


def test_chat_endpoint_malformed_request():
    response = client.post("/api/chat", json={"test": "test"})
    assert response.status_code == 400
    assert "type" in response.text
    assert "loc" in response.text
    assert "msg" in response.text


def test_chat_endpoint_empty_message():
    response = client.post("/api/chat", json={"message": ""})
    assert response.status_code == 400
    assert "type" in response.text
    assert "loc" in response.text
    assert "msg" in response.text


def test_chat_endpoint_success(mocker):
    """
    Testing features with external API calls can be done in several ways:
    1. Setting up a test environment for the external API.
    2. Mocking the external API call to return a known response.

    Mocking is the simplest and most efficient method. It isolates the test
    from the external API, making it faster and more reliable.

    This test demonstrates how to mock the OpenAI API call within the chat
    endpoint to return a known response.
    """
    openai_mock_response = mocker.MagicMock()
    openai_mock_response.choices = [mocker.MagicMock()]
    openai_mock_response.choices[0].message.content = "What's up?"

    mocker.patch(
        "openai.chat.completions.create",
        return_value=openai_mock_response,
    )
    response = client.post("/api/chat", json={"message": "Hello, World!"})
    assert response.status_code == 200
    assert response.json() == {"response": "What's up?"}

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

# Chat enpoint

def test_chat_endpoint_malformed_request():
    response = client.post("/api/chat", json={"test": "test"})
    assert response.status_code == 400
    assert response.json() == {"error_message": "Malformed request"}


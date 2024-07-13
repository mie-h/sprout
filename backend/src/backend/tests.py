from fastapi.testclient import TestClient

from backend.app import app


client = TestClient(app)


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

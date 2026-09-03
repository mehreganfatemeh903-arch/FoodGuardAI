from fastapi.testclient import TestClient

from backend.app.main import app


client = TestClient(app)


def test_root():
    response = client.get("/")

    assert response.status_code == 200

    data = response.json()

    assert data["message"] == "FoodGuardAI API is running"
    assert data["version"] == "0.1.0"
    assert data["environment"] == "development"


def test_health():
    response = client.get("/health")

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "ok"
    assert data["service"] == "FoodGuardAI"
    assert data["environment"] == "development"

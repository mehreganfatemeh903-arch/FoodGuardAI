from fastapi.testclient import TestClient

from backend.app.main import app


client = TestClient(app)


def test_food_analysis():
    response = client.post(
        "/api/food/analyze",
        json={
            "food_name": "Chicken Salad",
            "ingredients": [
                "chicken",
                "lettuce",
                "tomato",
                "mayonnaise",
            ],
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["food_name"] == "Chicken Salad"
    assert data["safety_score"] == 100.0
    assert data["quality_score"] == 100.0
    assert data["risk_level"] == "low"
    assert data["recommendations"] == []


def test_high_risk_food():
    response = client.post(
        "/api/food/analyze",
        json={
            "food_name": "Raw Chicken",
            "ingredients": [
                "raw chicken",
                "egg",
                "milk",
            ],
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["food_name"] == "Raw Chicken"
    assert data["safety_score"] == 40.0
    assert data["quality_score"] == 100.0
    assert data["risk_level"] == "high"
    assert len(data["recommendations"]) == 2


def test_low_quality_food():
    response = client.post(
        "/api/food/analyze",
        json={
            "food_name": "Processed Food",
            "ingredients": [
                "chicken",
                "sugar",
                "trans fat",
            ],
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["food_name"] == "Processed Food"
    assert data["safety_score"] == 100.0
    assert data["quality_score"] == 70.0
    assert data["risk_level"] == "low"
    assert data["recommendations"] == []

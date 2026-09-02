from fastapi import APIRouter

from app.schemas.food import (
    FoodAnalysisRequest,
    FoodAnalysisResponse,
)
from app.services.food_analysis import analyze_food


router = APIRouter(prefix="/api/food", tags=["Food Analysis"])


@router.post("/analyze", response_model=FoodAnalysisResponse)
def analyze_food_endpoint(
    data: FoodAnalysisRequest,
) -> FoodAnalysisResponse:
    return analyze_food(data)

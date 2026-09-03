from pydantic import BaseModel, Field


class FoodAnalysisRequest(BaseModel):
    food_name: str = Field(..., min_length=1, max_length=200)
    ingredients: list[str] = Field(..., min_length=1)


class FoodAnalysisResponse(BaseModel):
    food_name: str
    safety_score: float = Field(..., ge=0, le=100)
    quality_score: float = Field(..., ge=0, le=100)
    risk_level: str
    recommendations: list[str] = Field(default_factory=list)

from app.schemas.food import (
    FoodAnalysisRequest,
    FoodAnalysisResponse,
)


HIGH_RISK_INGREDIENTS = {
    "raw chicken",
    "raw meat",
    "raw fish",
    "raw egg",
    "unpasteurized milk",
}


ALLERGENS = {
    "milk",
    "egg",
    "peanut",
    "nuts",
    "soy",
    "wheat",
    "fish",
    "shellfish",
}


LOW_QUALITY_INGREDIENTS = {
    "sugar",
    "high fructose corn syrup",
    "trans fat",
    "hydrogenated oil",
    "artificial flavor",
    "artificial color",
}


def calculate_quality_score(ingredients: set[str]) -> float:
    score = 100.0

    low_quality = ingredients.intersection(LOW_QUALITY_INGREDIENTS)

    score -= min(60.0, len(low_quality) * 15.0)

    return max(0.0, score)


def analyze_food(data: FoodAnalysisRequest) -> FoodAnalysisResponse:
    ingredients = {
        ingredient.strip().lower()
        for ingredient in data.ingredients
    }

    high_risk = ingredients.intersection(HIGH_RISK_INGREDIENTS)
    allergens = ingredients.intersection(ALLERGENS)

    safety_score = 100.0
    recommendations = []

    if high_risk:
        safety_score -= min(60.0, len(high_risk) * 60.0)
        recommendations.append(
            "High-risk ingredients detected. Ensure proper cooking and storage."
        )

    if allergens:
        recommendations.append(
            f"Potential allergens detected: {', '.join(sorted(allergens))}."
        )

    safety_score = max(0.0, safety_score)

    quality_score = calculate_quality_score(ingredients)

    if safety_score >= 80:
        risk_level = "low"
    elif safety_score >= 50:
        risk_level = "medium"
    else:
        risk_level = "high"

    return FoodAnalysisResponse(
        food_name=data.food_name,
        safety_score=safety_score,
        quality_score=quality_score,
        risk_level=risk_level,
        recommendations=recommendations,
    )


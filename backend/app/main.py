from fastapi import FastAPI

from backend.app.api.food import router as food_router
from backend.app.core.config import settings


app = FastAPI(
    title=settings.app_name,
    description="AI-powered food safety and quality analysis API",
    version="0.1.0",
    debug=settings.debug,
)

app.include_router(food_router)


@app.get("/")
def root():
    return {
        "message": f"{settings.app_name} API is running",
        "version": "0.1.0",
        "environment": settings.app_env,
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": settings.app_name,
        "environment": settings.app_env,
    }

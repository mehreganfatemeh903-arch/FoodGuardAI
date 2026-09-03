from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.food import router as food_router
from .core.config import settings

app = FastAPI(
    title=settings.app_name,
    description="AI-powered food safety and quality analysis API",
    version="0.1.0",
    debug=settings.debug,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://mehreganfatemeh903-arch.github.io",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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

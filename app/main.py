"""
OsteoVision AI Backend
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.database.init_db import init_database

from app.api.auth import router as auth_router
from app.api.user import router as user_router
from app.api.prediction import router as prediction_router
from app.api.chat import router as chat_router

from src.config.settings import PREDICTIONS_DIR


@asynccontextmanager
async def lifespan(_: FastAPI):

    # Create database tables on first run.
    init_database()

    yield


app = FastAPI(
    title="OsteoVision AI",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(prediction_router)
app.include_router(chat_router)

# Grad-CAM / feature-map images generated for each prediction.
app.mount(
    "/media/predictions",
    StaticFiles(directory=PREDICTIONS_DIR),
    name="predictions",
)


@app.get("/")
def root():

    return {
        "message": "OsteoVision AI Backend Running"
    }


@app.get("/health")
def health():

    return {"status": "ok"}

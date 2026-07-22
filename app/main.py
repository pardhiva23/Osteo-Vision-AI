"""
OsteoVision AI Backend
"""

from fastapi import FastAPI

from app.api.auth import router as auth_router
from app.api.user import router as user_router
from app.api.prediction import router as prediction_router
from app.api.chat import router as chat_router

app = FastAPI(
    title="OsteoVision AI",
    version="1.0.0",
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(prediction_router)
app.include_router(chat_router)


@app.get("/")
def root():

    return {
        "message": "OsteoVision AI Backend Running"
    }
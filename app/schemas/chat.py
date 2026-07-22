"""
Chat Schemas
"""

from datetime import datetime

from pydantic import BaseModel


class ChatRequest(BaseModel):

    message: str

    prediction_id: int | None = None


class ChatResponse(BaseModel):

    role: str

    message: str

    created_at: datetime

    model_config = {

        "from_attributes": True

    }
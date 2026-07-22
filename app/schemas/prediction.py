"""
Prediction Schemas
"""

from datetime import datetime

from pydantic import BaseModel


class PredictionResponse(BaseModel):

    id: int

    prediction: str

    image_name: str

    confidence: float

    inference_time: float

    folder: str

    created_at: datetime

    model_config = {

        "from_attributes": True

    }
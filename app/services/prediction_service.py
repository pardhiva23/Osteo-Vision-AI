"""
Prediction Service
OsteoVision AI
"""

from pathlib import Path

from sqlalchemy.orm import Session

from app.database.crud import save_prediction
from src.inference.predictor import OsteoVisionPredictor


class PredictionService:
    """
    Handles OsteoVision prediction workflow.
    """

    def __init__(self):

        self.predictor = OsteoVisionPredictor()

    def predict(
        self,
        db: Session,
        user_id: int,
        image_path: str,
    ):
        """
        Run prediction and save to database.
        """

        result = self.predictor.predict(
            image_path
        )

        record = save_prediction(
            db=db,
            user_id=user_id,
            image_name=Path(image_path).name,
            folder=result["folder"],
            prediction=result["prediction"],
            confidence=result["confidence"],
            inference_time=result["inference_time"],
        )

        return {
            "prediction_id": record.id,
            "image_name": Path(image_path).name,
            "prediction": result["prediction"],
            "confidence": result["confidence"],
            "probabilities": result["probabilities"],
            "inference_time": result["inference_time"],
            "folder": result["folder"],
        }


prediction_service = PredictionService()
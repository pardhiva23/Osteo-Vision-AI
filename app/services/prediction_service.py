"""
Prediction Service
OsteoVision AI
"""

from pathlib import Path

from sqlalchemy.orm import Session

from app.database.crud import save_prediction
from src.inference.predictor import OsteoVisionPredictor


MEDIA_URL = "/media/predictions"


def build_image_urls(folder_name: str) -> dict:
    """
    URLs (served by the backend) of the images generated for a prediction.
    """

    base = f"{MEDIA_URL}/{folder_name}"

    return {
        "original": f"{base}/original.png",
        "gradcam_overlay": f"{base}/gradcam_overlay.png",
        "gradcam_heatmap": f"{base}/gradcam_heatmap.png",
        "feature_maps": f"{base}/all_feature_maps.png",
    }


def serialize_prediction(record) -> dict:
    """
    Convert a Prediction DB row into an API response.
    """

    return {
        "id": record.id,
        "image_name": record.image_name,
        "prediction": record.prediction,
        "confidence": record.confidence,
        "inference_time": record.inference_time,
        "folder": record.folder,
        "created_at": record.created_at,
        "images": build_image_urls(record.folder),
    }


class PredictionService:
    """
    Handles OsteoVision prediction workflow.
    """

    def __init__(self):

        self._predictor = None

    @property
    def predictor(self):
        # Load the model on first use so the API starts quickly.
        if self._predictor is None:
            self._predictor = OsteoVisionPredictor()

        return self._predictor

    def predict(
        self,
        db: Session,
        user_id: int,
        image_path: str,
        original_name: str | None = None,
    ):
        """
        Run prediction and save to database.
        """

        result = self.predictor.predict(
            image_path
        )

        folder_name = Path(result["folder"]).name

        record = save_prediction(
            db=db,
            user_id=user_id,
            image_name=original_name or Path(image_path).name,
            folder=folder_name,
            prediction=result["prediction"],
            confidence=result["confidence"],
            inference_time=result["inference_time"],
        )

        return {
            "prediction_id": record.id,
            "image_name": record.image_name,
            "prediction": result["prediction"],
            "confidence": result["confidence"],
            "probabilities": result["probabilities"],
            "inference_time": result["inference_time"],
            "folder": folder_name,
            "images": build_image_urls(folder_name),
        }


prediction_service = PredictionService()

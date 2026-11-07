"""
Prediction API
"""

from pathlib import Path
import shutil
import uuid

from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.core.config import ROOT_DIR
from app.database.database import get_db
from app.services.prediction_service import (
    prediction_service,
    serialize_prediction,
)
from app.database.crud import (
    get_prediction_history,
    get_prediction_by_id,
    delete_prediction,
)

router = APIRouter(
    prefix="/prediction",
    tags=["Prediction"],
)

UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".tif", ".tiff", ".webp"}


@router.post("/predict")
def predict(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Upload a histopathology image and get a prediction.
    """

    original_name = Path(file.filename or "image").name

    suffix = Path(original_name).suffix.lower()

    if suffix not in ALLOWED_EXTENSIONS:

        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Please upload a JPG or PNG image.",
        )

    # Never trust the client's filename on disk.
    image_path = UPLOAD_DIR / f"{uuid.uuid4().hex}{suffix}"

    try:

        with open(image_path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer,
            )

        return prediction_service.predict(
            db=db,
            user_id=current_user.id,
            image_path=str(image_path),
            original_name=original_name,
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

    finally:

        image_path.unlink(missing_ok=True)


@router.get("/history")
def history(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Return all predictions for the logged-in user.
    """

    records = get_prediction_history(
        db=db,
        user_id=current_user.id,
    )

    return [serialize_prediction(r) for r in records]


def _get_owned_prediction(db, prediction_id, user):

    prediction = get_prediction_by_id(
        db,
        prediction_id,
    )

    if prediction is None:

        raise HTTPException(
            status_code=404,
            detail="Prediction not found.",
        )

    if prediction.user_id != user.id:

        raise HTTPException(
            status_code=403,
            detail="Access denied.",
        )

    return prediction


@router.get("/{prediction_id}")
def prediction_details(
    prediction_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):

    prediction = _get_owned_prediction(
        db,
        prediction_id,
        current_user,
    )

    return serialize_prediction(prediction)


@router.delete("/{prediction_id}")
def delete_prediction_api(
    prediction_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):

    _get_owned_prediction(
        db,
        prediction_id,
        current_user,
    )

    delete_prediction(
        db,
        prediction_id,
    )

    return {
        "message": "Prediction deleted successfully."
    }

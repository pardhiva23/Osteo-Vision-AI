"""
Prediction API
"""

from pathlib import Path
import shutil

from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.database import get_db
from app.services.prediction_service import prediction_service
from app.database.crud import get_prediction_history
from app.database.crud import get_prediction_by_id
from app.database.crud import delete_prediction

router = APIRouter(
    prefix="/prediction",
    tags=["Prediction"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/predict")
def predict(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):

    try:

        image_path = UPLOAD_DIR / file.filename

        with open(image_path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer,
            )

        return prediction_service.predict(
            db=db,
            user_id=current_user.id,
            image_path=str(image_path),
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )
    

@router.get("/history")
def history(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Return all predictions for the logged-in user.
    """

    return get_prediction_history(
        db=db,
        user_id=current_user.id,
    )

@router.get("/{prediction_id}")
def prediction_details(
    prediction_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):

    prediction = get_prediction_by_id(
        db,
        prediction_id,
    )

    if prediction is None:

        raise HTTPException(
            status_code=404,
            detail="Prediction not found.",
        )

    if prediction.user_id != current_user.id:

        raise HTTPException(
            status_code=403,
            detail="Access denied.",
        )

    return prediction

@router.delete("/{prediction_id}")
def delete_prediction_api(
    prediction_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):

    prediction = get_prediction_by_id(
        db,
        prediction_id,
    )

    if prediction is None:

        raise HTTPException(
            status_code=404,
            detail="Prediction not found.",
        )

    if prediction.user_id != current_user.id:

        raise HTTPException(
            status_code=403,
            detail="Access denied.",
        )

    delete_prediction(
        db,
        prediction_id,
    )

    return {
        "message": "Prediction deleted successfully."
    }
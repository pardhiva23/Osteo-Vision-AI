"""
Chat API
OsteoVision AI
"""

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.crud import get_chat_history
from app.database.database import get_db

from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
)

from app.services.chat_service import (
    chat_service,
)

router = APIRouter(
    prefix="/chat",
    tags=["AI Assistant"],
)


@router.post("/")
def chat(
    request: ChatRequest,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Chat with OsteoVision AI.
    """

    try:

        response = chat_service.chat(
            db=db,
            user_id=current_user.id,
            message=request.message,
            prediction_id=request.prediction_id,
        )

        return {
            "response": response,
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )

    except RuntimeError as e:

        # e.g. GEMINI_API_KEY not configured
        raise HTTPException(
            status_code=503,
            detail=str(e),
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.get(
    "/history",
    response_model=list[ChatResponse],
)
def history(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Return chat history.
    """

    return get_chat_history(
        db,
        current_user.id,
    )

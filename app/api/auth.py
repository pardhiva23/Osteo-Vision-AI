"""
Authentication API
OsteoVision AI
"""

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.user import (
    UserCreate,
    UserResponse,
)

from app.schemas.token import (
    Token,
)

from app.services.auth_service import (
    register_user,
    login_user,
)
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):

    try:

        return register_user(
            db=db,
            username=user.username,
            email=user.email,
            password=user.password,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.post(
    "/login",
    response_model=Token,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    """
    Login user and return JWT token.
    """

    try:

        access_token, _ = login_user(
            db=db,
            email=form_data.username,
            password=form_data.password,
        )

        return Token(
            access_token=access_token,
            token_type="bearer",
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )

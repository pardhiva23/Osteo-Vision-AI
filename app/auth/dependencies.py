"""
Authentication Dependencies
OsteoVision AI
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.crud import get_user_by_email

from app.auth.jwt_handler import verify_access_token


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="auth/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    """
    Return currently authenticated user.
    """

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials.",
        headers={
            "WWW-Authenticate": "Bearer",
        },
    )

    try:

        payload = verify_access_token(token)

        if payload is None:
            raise credentials_exception

        email = payload.get("sub")

        if email is None:
            raise credentials_exception

    except JWTError:

        raise credentials_exception

    user = get_user_by_email(
        db,
        email,
    )

    if user is None:

        raise credentials_exception

    return user
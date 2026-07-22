"""
Authentication Service
OsteoVision AI
"""

from sqlalchemy.orm import Session

from app.auth.hashing import (
    hash_password,
    verify_password,
)

from app.auth.jwt_handler import (
    create_access_token,
)

from app.database.crud import (
    get_user_by_email,
    get_user_by_username,
    create_user,
)


def register_user(
    db: Session,
    username: str,
    email: str,
    password: str,
):
    """
    Register a new user.
    """

    if get_user_by_email(db, email):

        raise ValueError(
            "Email already registered."
        )

    if get_user_by_username(
        db,
        username,
    ):

        raise ValueError(
            "Username already exists."
        )

    password_hash = hash_password(
        password
    )

    return create_user(
        db=db,
        username=username,
        email=email,
        password_hash=password_hash,
    )


def login_user(
    db: Session,
    email: str,
    password: str,
):
    """
    Authenticate user.
    """

    user = get_user_by_email(
        db,
        email,
    )

    if user is None:

        raise ValueError(
            "Invalid email or password."
        )

    if not verify_password(
        password,
        user.password_hash,
    ):

        raise ValueError(
            "Invalid email or password."
        )

    access_token = create_access_token(
        {
            "sub": user.email,
        }
    )

    return access_token, user
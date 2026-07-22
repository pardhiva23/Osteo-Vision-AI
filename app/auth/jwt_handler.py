"""
JWT Authentication
OsteoVision AI
"""

from datetime import datetime, timedelta, timezone
from app.core.config import settings

from jose import JWTError, jwt

# ===========================
# JWT CONFIGURATION
# ===========================

SECRET_KEY= settings.SECRET_KEY

ALGORITHM= settings.ALGORITHM

ACCESS_TOKEN_EXPIRE_MINUTES= settings.ACCESS_TOKEN_EXPIRE_MINUTES


# ===========================
# CREATE TOKEN
# ===========================

def create_access_token(
    data: dict,
    expires_delta: timedelta | None = None,
):
    """
    Create JWT access token.
    """

    payload = data.copy()

    if expires_delta:

        expire = (
            datetime.now(timezone.utc)
            + expires_delta
        )

    else:

        expire = (
            datetime.now(timezone.utc)
            + timedelta(
                minutes=ACCESS_TOKEN_EXPIRE_MINUTES
            )
        )

    payload.update(
        {
            "exp": expire,
        }
    )

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


# ===========================
# VERIFY TOKEN
# ===========================

def verify_access_token(
    token: str,
):
    """
    Verify JWT token.
    """

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        return payload

    except JWTError:

        return None
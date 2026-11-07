"""
Application Configuration
OsteoVision AI
"""

import os
import secrets
import warnings
from pathlib import Path

from dotenv import load_dotenv


ROOT_DIR = Path(__file__).resolve().parents[2]

load_dotenv(ROOT_DIR / ".env")


def _secret_key() -> str:
    key = os.getenv("SECRET_KEY")

    if key and key != "change-me":
        return key

    # No usable key configured: generate a temporary one so the app still
    # starts. Tokens become invalid on every restart, so set SECRET_KEY in .env.
    warnings.warn(
        "SECRET_KEY is not set in .env - using a temporary key. "
        "Logins will be reset on every restart.",
        stacklevel=2,
    )
    return secrets.token_hex(32)


class Settings:

    PROJECT_NAME = "OsteoVision AI"

    SECRET_KEY = _secret_key()

    ALGORITHM = os.getenv("ALGORITHM", "HS256")

    ACCESS_TOKEN_EXPIRE_MINUTES = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60)
    )

    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        f"sqlite:///{(ROOT_DIR / 'osteovision.db').as_posix()}",
    )

    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

    GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")

    CORS_ORIGINS = [
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173",
        ).split(",")
        if origin.strip()
    ]


settings = Settings()

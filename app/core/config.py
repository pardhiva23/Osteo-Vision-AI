"""
Application Configuration
OsteoVision AI
"""

from pathlib import Path

from dotenv import load_dotenv

import os


ROOT_DIR = Path(__file__).resolve().parents[2]

load_dotenv(ROOT_DIR / ".env")


class Settings:

    PROJECT_NAME = "OsteoVision AI"

    SECRET_KEY = os.getenv(
        "SECRET_KEY"
    )

    ALGORITHM = os.getenv(
        "ALGORITHM",
        "HS256",
    )

    ACCESS_TOKEN_EXPIRE_MINUTES = int(
        os.getenv(
            "ACCESS_TOKEN_EXPIRE_MINUTES",
            60,
        )
    )

    DATABASE_URL = os.getenv(
        "DATABASE_URL"
    )

    MODEL_PATH = os.getenv(
        "MODEL_PATH"
    )

    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    
    GEMINI_MODEL = os.getenv(
        "GEMINI_MODEL",
        "gemini-2.5-flash",
    )


settings = Settings()
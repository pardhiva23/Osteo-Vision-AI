"""
Database Configuration
OsteoVision AI
"""

from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

DATABASE_PATH = (
    Path("app")
    / "database"
    / "osteovision.db"
)

DATABASE_URL = (
    f"sqlite:///{DATABASE_PATH}"
)


engine = create_engine(
    settings.DATABASE_URL,
    connect_args={
        "check_same_thread": False,
    },
)


SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)


class Base(DeclarativeBase):
    pass


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()
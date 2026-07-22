"""
Database Models
"""

from datetime import datetime

from sqlalchemy import (
    String,
    Integer,
    Float,
    DateTime,
    ForeignKey,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.database.database import Base


class User(Base):

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    username: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        index=True,
    )

    email: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        index=True,
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    predictions = relationship(
        "Prediction",
        back_populates="user",
        cascade="all, delete",
    )

    chats = relationship(
        "Chat",
        back_populates="user",
        cascade="all, delete",
    )

class Prediction(Base):
    """
    Stores prediction history for each user.
    """

    __tablename__ = "predictions"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        index=True,
    )

    image_name: Mapped[str] = mapped_column(
        String(255),
    )

    prediction: Mapped[str] = mapped_column(
        String(50),
    )

    confidence: Mapped[float] = mapped_column(
        Float,
    )

    inference_time: Mapped[float] = mapped_column(
        Float,
    )

    folder: Mapped[str] = mapped_column(
        String(255),
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    model_version: Mapped[str] = mapped_column(
        String(50),
        default="OsteoVisionNet-v1",
    )
      

    user = relationship(
        "User",
        back_populates="predictions",
    )





class Chat(Base):

    __tablename__ = "chat_history"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        index=True,
    )

    role: Mapped[str] = mapped_column(
        String(20),
    )

    message: Mapped[str] = mapped_column(
        String(50000),
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    user = relationship(
        "User",
        back_populates="chats",
    )
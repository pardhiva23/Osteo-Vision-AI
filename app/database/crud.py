"""
Database CRUD Operations
OsteoVision AI
"""

from sqlalchemy.orm import Session

from app.database.models import (
    User,
    Prediction,
    Chat,
)


# ==========================
# USER OPERATIONS
# ==========================

def get_user_by_email(
    db: Session,
    email: str,
):

    return (
        db.query(User)
        .filter(User.email == email)
        .first()
    )


def get_user_by_username(
    db: Session,
    username: str,
):

    return (
        db.query(User)
        .filter(User.username == username)
        .first()
    )


def create_user(
    db: Session,
    username: str,
    email: str,
    password_hash: str,
):

    user = User(
        username=username,
        email=email,
        password_hash=password_hash,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


# ==========================
# PREDICTIONS
# ==========================

def save_prediction(
    db: Session,
    user_id: int,
    image_name: str,
    folder: str,
    prediction: str,
    confidence: float,
    inference_time: float,
):

    item = Prediction(
        user_id=user_id,
        image_name=image_name,
        folder=folder,
        prediction=prediction,
        confidence=confidence,
        inference_time=inference_time,
    )

    db.add(item)

    db.commit()

    db.refresh(item)

    return item


def get_prediction_history(
    db: Session,
    user_id: int,
):

    return (
        db.query(Prediction)
        .filter(
            Prediction.user_id == user_id
        )
        .order_by(
            Prediction.created_at.desc()
        )
        .all()
    )

def get_prediction_by_id(
    db: Session,
    prediction_id: int,
):
    """
    Retrieve a prediction by ID.
    """

    return (
        db.query(Prediction)
        .filter(
            Prediction.id == prediction_id
        )
        .first()
    )

def delete_prediction(
    db: Session,
    prediction_id: int,
):

    prediction = (
        db.query(Prediction)
        .filter(
            Prediction.id == prediction_id
        )
        .first()
    )

    if prediction:

        db.delete(prediction)

        db.commit()

    return prediction

# ==========================
# CHAT
# ==========================

def save_chat(
    db: Session,
    user_id: int,
    role: str,
    message: str,
):

    chat = Chat(
        user_id=user_id,
        role=role,
        message=message,
    )

    db.add(chat)

    db.commit()

    db.refresh(chat)

    return chat


def get_chat_history(
    db: Session,
    user_id: int,
):

    return (
        db.query(Chat)
        .filter(Chat.user_id == user_id)
        .order_by(Chat.created_at.asc())
        .all()
    )
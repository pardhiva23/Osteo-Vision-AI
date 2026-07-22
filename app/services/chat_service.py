"""
Gemini Chat Service
OsteoVision AI
"""

import google.generativeai as genai

from sqlalchemy.orm import Session

from app.core.config import settings
from app.database.crud import (
    save_chat,
    get_prediction_by_id,
)

genai.configure(
    api_key=settings.GEMINI_API_KEY
)


class ChatService:

    def __init__(self):

        self.model = genai.GenerativeModel(
            settings.GEMINI_MODEL
        )

    def chat(
        self,
        db: Session,
        user_id: int,
        message: str,
        prediction_id: int | None = None,
    ):

        if prediction_id:

            prediction = get_prediction_by_id(
                db,
                prediction_id,
            )

            if prediction is None:

                raise ValueError(
                    "Prediction not found."
                )

            prompt = f"""
You are OsteoVision AI.

A CNN classified an osteosarcoma histopathology image.

Prediction:
{prediction.prediction}

Confidence:
{prediction.confidence:.2f}

The user asks:

{message}

Explain the prediction in simple medical language.

Do NOT claim to replace a doctor.

Do NOT invent facts.
"""

        else:

            prompt = f"""
You are OsteoVision AI.

Answer only questions related to:

- Osteosarcoma
- Histopathology
- Bone tumors
- Medical imaging
- Deep Learning in pathology

Question:

{message}

Keep answers educational.

Do not diagnose patients.
"""

        response = self.model.generate_content(
            prompt
        )

        save_chat(
            db,
            user_id,
            "user",
            message,
        )

        save_chat(
            db,
            user_id,
            "assistant",
            response.text,
        )

        return response.text


chat_service = ChatService()
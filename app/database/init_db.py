"""
Initialize Database
"""

from app.database.database import (
    engine,
)

from app.database.models import Base


def init_database():

    Base.metadata.create_all(
        bind=engine,
    )

    print(
        "\nDatabase initialized successfully."
    )


if __name__ == "__main__":

    init_database()
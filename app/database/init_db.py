"""
Initialize Database
"""

from app.database.database import (
    engine,
)

from app.database import models  # noqa: F401  (registers the tables)
from app.database.database import Base


def init_database():

    Base.metadata.create_all(
        bind=engine,
    )


if __name__ == "__main__":

    init_database()

    print(
        "\nDatabase initialized successfully."
    )

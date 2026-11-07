"""
Artifact Manager
OsteoVision AI
"""

from datetime import datetime
from pathlib import Path
import json
import shutil
import uuid

from src.config.settings import PREDICTIONS_DIR


class ArtifactManager:

    PREDICTIONS = Path(PREDICTIONS_DIR)

    @classmethod
    def create_prediction_folder(cls):

        timestamp = datetime.now().strftime(
            "%Y%m%d_%H%M%S"
        )

        # Short random suffix keeps folder names unique and hard to guess.
        folder = cls.PREDICTIONS / f"{timestamp}_{uuid.uuid4().hex[:8]}"

        folder.mkdir(
            parents=True,
            exist_ok=True,
        )

        return folder

    @staticmethod
    def save_original(image_path, folder):

        destination = folder / "original.png"

        shutil.copy2(
            image_path,
            destination,
        )

        return destination

    @staticmethod
    def save_metadata(folder, metadata):

        with open(
            folder / "metadata.json",
            "w",
            encoding="utf-8",
        ) as f:

            json.dump(
                metadata,
                f,
                indent=4,
            )

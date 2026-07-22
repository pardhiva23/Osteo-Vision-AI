"""
Training Callbacks
OsteoVision AI
"""

from pathlib import Path

from tensorflow.keras.callbacks import (
    EarlyStopping,
    ReduceLROnPlateau,
    ModelCheckpoint,
    CSVLogger,
)

from src.config.settings import (
    BEST_MODEL_PATH,
    CSV_LOG_PATH,
)


def get_callbacks():
    """
    Returns all training callbacks.
    """

    # Create folders automatically
    Path(BEST_MODEL_PATH).parent.mkdir(parents=True, exist_ok=True)
    Path(CSV_LOG_PATH).parent.mkdir(parents=True, exist_ok=True)

    callbacks = [

        ModelCheckpoint(
            filepath=BEST_MODEL_PATH,
            monitor="val_accuracy",
            mode="max",
            save_best_only=True,
            verbose=1,
        ),

        EarlyStopping(
            monitor="val_accuracy",
            patience=15,
            restore_best_weights=True,
            verbose=1,
        ),

        ReduceLROnPlateau(
            monitor="val_loss",
            factor=0.5,
            patience=7,
            min_lr = 1e-6,
            verbose=1,
        ),

        CSVLogger(
            CSV_LOG_PATH,
            append=False,
        ),

    ]

    return callbacks
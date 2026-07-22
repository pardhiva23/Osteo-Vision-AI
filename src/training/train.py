"""
Train OsteoVisionNet
"""

import tensorflow as tf
import numpy as np
import random

from src.config.settings import SEED

tf.keras.utils.set_random_seed(SEED)
np.random.seed(SEED)
random.seed(SEED)

from src.preprocessing.data_loader import load_datasets
from src.models.model import build_model
from src.training.callbacks import get_callbacks

from src.config.settings import (
    EPOCHS,
    LEARNING_RATE
)

from src.training.class_weights import get_class_weights
from src.training.history import save_history
from src.config.settings import HISTORY_PATH

from src.evaluation.plots import plot_metrics_dashboard, plot_history, plot_roc
from src.config.settings import FIGURES_DIR

from src.evaluation.evaluate import evaluate_model
from src.config.settings import REPORT_DIR

from src.evaluation.confusion_matrix import save_confusion_matrix

from src.config.settings import (
    FIGURES_DIR,
    CLASS_NAMES,
)


def main():

    print("=" * 60)
    print("Loading Dataset...")
    print("=" * 60)

    train_ds, valid_ds, test_ds = load_datasets()

    print("=" * 60)
    print("Building OsteoVisionNet...")
    print("=" * 60)

    model = build_model()

    model.compile(
        optimizer=tf.keras.optimizers.Adam(
            learning_rate=LEARNING_RATE,
        ),
        loss=tf.keras.losses.SparseCategoricalCrossentropy(),
        metrics=["accuracy"],
    )

    model.summary()

    print("=" * 60)
    print("Computing Class Weights...")
    print("=" * 60)

    class_weights = get_class_weights(train_ds)

    print(class_weights)

    print("=" * 60)
    print("Training Started...")
    print("=" * 60)

    history = model.fit(
        train_ds,
        validation_data=valid_ds,
        epochs=EPOCHS,
        callbacks=get_callbacks(),
        class_weight=class_weights,
        verbose=1,
    )

    # -----------------------------
    # Save Training History
    # -----------------------------
    save_history(history, HISTORY_PATH)

    # -----------------------------
    # Training Curves
    # -----------------------------

    plot_history(history, FIGURES_DIR)

    print("=" * 60)
    print("Evaluating Model...")
    print("=" * 60)

    loss, accuracy = model.evaluate(test_ds, verbose=1)

    metrics = evaluate_model(
        model,
        test_ds,
        REPORT_DIR,
    )

    print("\nClassification report saved successfully.")

    # -----------------------------
    # Confusion Matrix
    # -----------------------------
    save_confusion_matrix(
        metrics["cm"],
        CLASS_NAMES,
        FIGURES_DIR,
    )

    print("Confusion matrix saved successfully.")

    # -----------------------------
    # Metrics Dashboard
    # -----------------------------
    plot_metrics_dashboard(
        metrics,
        CLASS_NAMES,
        FIGURES_DIR,
    )

    # -----------------------------
    # ROC Curve
    # -----------------------------
    plot_roc(
        metrics["y_true"],
        metrics["y_prob"],
        CLASS_NAMES,
        FIGURES_DIR,
    )

    print(f"\nTest Accuracy : {accuracy:.4f}")
    print(f"Test Loss     : {loss:.4f}")

    print("\nTraining Completed Successfully!")


if __name__ == "__main__":
    main()
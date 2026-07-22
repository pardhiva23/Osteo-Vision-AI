"""
Confusion Matrix
OsteoVision AI
"""

from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np

from sklearn.metrics import ConfusionMatrixDisplay


def save_confusion_matrix(cm, class_names, save_dir):

    save_dir = Path(save_dir)
    save_dir.mkdir(parents=True, exist_ok=True)

    plt.figure(figsize=(7,6))

    disp = ConfusionMatrixDisplay(
        confusion_matrix=cm,
        display_labels=class_names,
    )

    disp.plot(
        cmap="Blues",
        values_format="d",
        colorbar=False,
    )

    plt.title("Confusion Matrix")
    plt.tight_layout()

    plt.savefig(save_dir / "confusion_matrix.png")

    plt.close()
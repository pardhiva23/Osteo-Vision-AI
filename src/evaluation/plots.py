"""
Training Plots
OsteoVision AI
"""

from pathlib import Path
import matplotlib.pyplot as plt


def plot_history(history, save_dir):
    """
    Save accuracy and loss plots.
    """

    save_dir = Path(save_dir)
    save_dir.mkdir(parents=True, exist_ok=True)

    # Accuracy Plot
    plt.figure(figsize=(8, 5))
    plt.plot(history.history["accuracy"], label="Train Accuracy")
    plt.plot(history.history["val_accuracy"], label="Validation Accuracy")
    plt.xlabel("Epoch")
    plt.ylabel("Accuracy")
    plt.title("Training vs Validation Accuracy")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(save_dir / "accuracy_curve.png")
    plt.close()

    # Loss Plot
    plt.figure(figsize=(8, 5))
    plt.plot(history.history["loss"], label="Train Loss")
    plt.plot(history.history["val_loss"], label="Validation Loss")
    plt.xlabel("Epoch")
    plt.ylabel("Loss")
    plt.title("Training vs Validation Loss")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(save_dir / "loss_curve.png")
    plt.close()


def plot_roc(y_true, y_prob, class_names, save_dir):

    from pathlib import Path
    from sklearn.preprocessing import label_binarize
    from sklearn.metrics import roc_curve, auc

    save_dir = Path(save_dir)

    y_true = label_binarize(
        y_true,
        classes=range(len(class_names))
    )

    plt.figure(figsize=(7,6))

    for i, name in enumerate(class_names):

        fpr, tpr, _ = roc_curve(
            y_true[:,i],
            y_prob[:,i]
        )

        score = auc(fpr,tpr)

        plt.plot(
            fpr,
            tpr,
            label=f"{name} (AUC={score:.2f})"
        )

    plt.plot([0,1],[0,1],'k--')

    plt.xlabel("False Positive Rate")

    plt.ylabel("True Positive Rate")

    plt.title("ROC Curve")

    plt.legend()

    plt.grid(True)

    plt.tight_layout()

    plt.savefig(save_dir/"roc_curve.png")

    plt.close()

import numpy as np
from pathlib import Path
import matplotlib.pyplot as plt


def plot_metrics_dashboard(metrics, class_names, save_dir):

    save_dir = Path(save_dir)
    save_dir.mkdir(parents=True, exist_ok=True)

    precision = metrics["precision"]
    recall = metrics["recall"]
    f1 = metrics["f1"]
    cm = metrics["cm"]

    class_accuracy = cm.diagonal() / cm.sum(axis=1)

    x = np.arange(len(class_names))
    width = 0.2

    plt.figure(figsize=(10,6))

    plt.bar(x-1.5*width, precision, width, label="Precision")
    plt.bar(x-0.5*width, recall, width, label="Recall")
    plt.bar(x+0.5*width, f1, width, label="F1")
    plt.bar(x+1.5*width, class_accuracy, width, label="Accuracy")

    plt.xticks(x, class_names)

    plt.ylim(0,1)

    plt.ylabel("Score")

    plt.title("Model Performance Per Class")

    plt.grid(axis="y", alpha=0.3)

    plt.legend()

    plt.tight_layout()

    plt.savefig(save_dir/"evaluation_dashboard.png", dpi=300)

    plt.close()

def plot_prediction_distribution(probabilities,
                                 class_names,
                                 save_path):

    plt.figure(figsize=(7,4))

    plt.barh(class_names, probabilities)

    plt.xlim(0,1)

    plt.xlabel("Probability")

    plt.title("Prediction Confidence")

    for i,p in enumerate(probabilities):
        plt.text(
            p+0.01,
            i,
            f"{p:.2f}",
            va="center"
        )

    plt.tight_layout()

    plt.savefig(save_path, dpi=300)

    plt.close()
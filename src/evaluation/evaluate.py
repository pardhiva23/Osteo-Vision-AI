import numpy as np
from pathlib import Path

from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    precision_recall_fscore_support,
    roc_curve,
    auc,
)
from sklearn.preprocessing import label_binarize


def evaluate_model(model, test_dataset, report_dir):

    y_true = []
    y_pred = []
    y_prob = []

    for images, labels in test_dataset:

        probs = model.predict(images, verbose=0)

        preds = np.argmax(probs, axis=1)

        y_true.extend(labels.numpy())
        y_pred.extend(preds)
        y_prob.extend(probs)

    y_true = np.array(y_true)
    y_pred = np.array(y_pred)
    y_prob = np.array(y_prob)

    report = classification_report(
        y_true,
        y_pred,
        digits=4
    )

    Path(report_dir).mkdir(parents=True, exist_ok=True)

    with open(Path(report_dir) / "classification_report.txt", "w") as f:
        f.write(report)

    cm = confusion_matrix(y_true, y_pred)

    precision, recall, f1, support = precision_recall_fscore_support(
        y_true,
        y_pred,
        zero_division=0
    )

    return {
        "cm": cm,
        "y_true": y_true,
        "y_pred": y_pred,
        "y_prob": y_prob,
        "precision": precision,
        "recall": recall,
        "f1": f1,
        "support": support
    }
"""
Compute Class Weights
OsteoVision AI
"""

import numpy as np
from sklearn.utils.class_weight import compute_class_weight


def get_class_weights(train_dataset):
    """
    Compute class weights from the training dataset.
    """

    labels = []

    for _, y in train_dataset:
        labels.extend(y.numpy())

    labels = np.array(labels)

    classes = np.unique(labels)

    weights = compute_class_weight(
        class_weight="balanced",
        classes=classes,
        y=labels,
    )

    class_weights = {
        int(class_id): float(weight)
        for class_id, weight in zip(classes, weights)
    }

    return class_weights
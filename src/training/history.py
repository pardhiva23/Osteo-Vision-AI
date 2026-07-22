"""
Training History
"""

import pickle
from pathlib import Path


def save_history(history, save_path):
    """
    Save training history.
    """

    Path(save_path).parent.mkdir(parents=True, exist_ok=True)

    with open(save_path, "wb") as file:
        pickle.dump(history.history, file)
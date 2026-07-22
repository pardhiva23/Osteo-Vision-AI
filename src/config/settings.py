"""
Global Project Settings
OsteoVision AI
"""

from pathlib import Path


# ==========================================
# Project Information
# ==========================================

PROJECT_NAME = "OsteoVision AI"
PROJECT_VERSION = "1.0.0"
PROJECT_AUTHOR = "Tippala Pardhiva Reddy"

# ==========================================================
# PROJECT ROOT
# ==========================================================

ROOT_DIR = Path(__file__).resolve().parents[2]

# ==========================================================
# DATASET
# ==========================================================

DATA_DIR = ROOT_DIR / "data"
RAW_DATA_DIR = DATA_DIR / "raw"

DATASET_DIR = RAW_DATA_DIR / "dataset"

TRAIN_DIR = DATASET_DIR / "train"
VALID_DIR = DATASET_DIR / "validate"
TEST_DIR = DATASET_DIR / "test"

# ==========================================================
# MODEL
# ==========================================================

IMAGE_SIZE = (224, 224)

NUM_CLASSES = 3

CLASS_NAMES = [
    "Non-Tumor",
    "Non-Viable-Tumor",
    "Viable",
]

BATCH_SIZE = 16

EPOCHS = 30

LEARNING_RATE = 3e-4

SEED = 42

# ==========================================================
# ARTIFACTS
# ==========================================================

ARTIFACTS_DIR = ROOT_DIR / "artifacts"

MODEL_DIR = ARTIFACTS_DIR / "models"

PLOTS_DIR = ARTIFACTS_DIR / "plots"

GRADCAM_DIR = ARTIFACTS_DIR / "gradcam"

PREDICTIONS_DIR = ARTIFACTS_DIR / "predictions"

FEATURE_MAP_DIR = ARTIFACTS_DIR / "feature_maps"

LOG_DIR = ARTIFACTS_DIR / "logs"

REPORT_DIR = ARTIFACTS_DIR / "reports"

# ==========================================
# Model Saving
# ==========================================

MODEL_NAME = "OsteoVisionNet"

CSV_LOG_PATH = LOG_DIR / "training_log.csv"

HISTORY_DIR = ARTIFACTS_DIR / "history"

HISTORY_PATH = HISTORY_DIR / "history.pkl"

FIGURES_DIR = ARTIFACTS_DIR / "figures"

EXPLAINABILITY_DIR = ARTIFACTS_DIR / "figures"

EXPLAINABILITY_DIR.mkdir(parents=True, exist_ok=True)

# ==========================================================
# CREATE DIRECTORIES
# ==========================================================

for directory in [
    ARTIFACTS_DIR,
    MODEL_DIR,
    PLOTS_DIR,
    GRADCAM_DIR,
    PREDICTIONS_DIR,
    FEATURE_MAP_DIR,
    LOG_DIR,
    REPORT_DIR,
]:
    directory.mkdir(parents=True, exist_ok=True)

# ==========================================================
# MODEL PATH
# ==========================================================

BEST_MODEL_PATH = MODEL_DIR / "best_model.keras"
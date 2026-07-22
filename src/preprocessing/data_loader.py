"""
Dataset Loader
OsteoVision AI
"""

import tensorflow as tf

from src.config.settings import (
    TRAIN_DIR,
    VALID_DIR,
    TEST_DIR,
    IMAGE_SIZE,
    BATCH_SIZE,
    SEED,
    CLASS_NAMES,
)


def load_datasets():
    common_args = dict(
        seed=SEED,
        image_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        class_names=CLASS_NAMES,   # <-- pin the mapping explicitly
        label_mode="int",
    )

    train_dataset = tf.keras.utils.image_dataset_from_directory(
        TRAIN_DIR, shuffle=True, **common_args
    )
    validation_dataset = tf.keras.utils.image_dataset_from_directory(
        VALID_DIR, shuffle=False, **common_args
    )
    test_dataset = tf.keras.utils.image_dataset_from_directory(
        TEST_DIR, shuffle=False, **common_args
    )
    

    from src.preprocessing.preprocess import prepare_dataset

    train_dataset = prepare_dataset(train_dataset, training=True)
    validation_dataset = prepare_dataset(validation_dataset)
    test_dataset = prepare_dataset(test_dataset)

    return train_dataset, validation_dataset, test_dataset
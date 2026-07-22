"""
Data Augmentation
OsteoVision AI
"""

import tensorflow as tf

def get_data_augmentation():
    return tf.keras.Sequential([
        tf.keras.layers.RandomFlip("horizontal_and_vertical"),
        tf.keras.layers.RandomRotation(0.04),
        tf.keras.layers.RandomZoom(0.08),
    ], name="data_augmentation")
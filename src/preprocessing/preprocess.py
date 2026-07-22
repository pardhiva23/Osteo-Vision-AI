"""
Dataset Preprocessing
OsteoVision AI
"""

import tensorflow as tf

def prepare_dataset(dataset, training=False):
    AUTOTUNE = tf.data.AUTOTUNE

    def normalize(image, label):
        image = tf.cast(image, tf.float32) / 255.0
        return image, label

    dataset = dataset.map(normalize, num_parallel_calls=AUTOTUNE)
    dataset = dataset.cache()  # cache raw decoded/normalized data

    if training:
        dataset = dataset.shuffle(buffer_size=1000, reshuffle_each_iteration=True)

    dataset = dataset.prefetch(AUTOTUNE)
    return dataset
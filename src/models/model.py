"""
OsteoVisionNet
Model Architecture
"""

from tensorflow.keras import Model
from tensorflow.keras.layers import (
    Input,
    Conv2D,
    BatchNormalization,
    Activation,
    MaxPooling2D,
    GlobalAveragePooling2D,
    Dense,
    Dropout,
)

from src.models.blocks import residual_block
from src.preprocessing.augmentation import get_data_augmentation
from src.config.settings import NUM_CLASSES


def build_model():

    inputs = Input(shape=(224, 224, 3))

    augmentation = get_data_augmentation()

    x = augmentation(inputs)

    # Stem
    x = Conv2D(
        32,
        3,
        padding="same",
        use_bias=False,
        kernel_initializer="he_normal",
        name="stem_conv",
    )(x)

    x = BatchNormalization(name="stem_bn")(x)
    x = Activation("relu", name="stem_relu")(x)
    x = MaxPooling2D(2, name="stem_pool")(x)

    # Residual Stages
    x = residual_block(x, 32, name="block1")
    x = MaxPooling2D(2)(x)

    x = residual_block(x, 64, name="block2")
    x = MaxPooling2D(2)(x)

    x = residual_block(x, 128, name="block3")
    x = MaxPooling2D(2)(x)

    x = residual_block(x, 256, name="block4")
    x = MaxPooling2D(2)(x)

    # Classification Head
    x = GlobalAveragePooling2D()(x)

    x = Dense(
        128,
        activation="relu",
        kernel_initializer="he_normal",
    )(x)

    x = Dropout(0.5)(x)

    outputs = Dense(
        NUM_CLASSES,
        activation="softmax",
    )(x)

    return Model(
        inputs,
        outputs,
        name="OsteoVisionNet_v2",
    )
"""
Lightweight Residual Blocks
OsteoVision AI
"""

from tensorflow.keras.layers import (
    Conv2D,
    SeparableConv2D,
    BatchNormalization,
    Activation,
    Add,
)


def residual_block(inputs, filters, stride=1, name="block"):
    """
    Lightweight Residual Block
    """

    shortcut = inputs

    # Projection shortcut when needed
    if stride != 1 or inputs.shape[-1] != filters:
        shortcut = Conv2D(
            filters,
            kernel_size=1,
            strides=stride,
            padding="same",
            use_bias=False,
            kernel_initializer="he_normal",
            name=f"{name}_shortcut_conv",
        )(shortcut)

        shortcut = BatchNormalization(
            name=f"{name}_shortcut_bn"
        )(shortcut)

    # First convolution
    x = SeparableConv2D(
        filters,
        kernel_size=3,
        strides=stride,
        padding="same",
        use_bias=False,
        depthwise_initializer="he_normal",
        pointwise_initializer="he_normal",
        name=f"{name}_conv1",
    )(inputs)

    x = BatchNormalization(name=f"{name}_bn1")(x)
    x = Activation("relu", name=f"{name}_relu1")(x)

    # Second convolution
    x = SeparableConv2D(
        filters,
        kernel_size=3,
        padding="same",
        use_bias=False,
        depthwise_initializer="he_normal",
        pointwise_initializer="he_normal",
        name=f"{name}_conv2",
    )(x)

    x = BatchNormalization(name=f"{name}_bn2")(x)

    # Residual connection
    x = Add(name=f"{name}_add")([x, shortcut])

    x = Activation("relu", name=f"{name}_output")(x)

    return x
"""
Grad-CAM
OsteoVision AI
"""

from pathlib import Path

import cv2
import numpy as np
import tensorflow as tf


class GradCAM:
    """
    Grad-CAM implementation for OsteoVisionNet.
    """

    def __init__(self, model):

        self.model = model

        self.layer_name = self._find_last_conv_layer()

        print(
            f"\nUsing GradCAM Layer : {self.layer_name}"
        )

        self.grad_model = tf.keras.models.Model(
            inputs=self.model.inputs,
            outputs=[
                self.model.get_layer(
                    self.layer_name
                ).output,
                self.model.output,
            ],
        )

    def _find_last_conv_layer(self):
        """
        Automatically find last Conv2D layer.
        """

        for layer in reversed(self.model.layers):

            if isinstance(
                layer,
                tf.keras.layers.Conv2D,
            ):

                return layer.name

        raise ValueError(
            "No Conv2D layer found."
        )

    def generate(
        self,
        image,
        class_index=None,
    ):
        """
        Generate GradCAM heatmap.
        """

        if image.ndim == 3:

            image = np.expand_dims(
                image,
                axis=0,
            )

        image = image.astype(
            np.float32
        )

        if image.max() > 1:

            image /= 255.0

        with tf.GradientTape() as tape:

            conv_output, predictions = (
                self.grad_model(
                    image,
                    training=False,
                )
            )

            if class_index is None:

                class_index = tf.argmax(
                    predictions[0]
                )

            loss = predictions[
                :,
                class_index,
            ]

        gradients = tape.gradient(
            loss,
            conv_output,
        )

        conv_output = conv_output[0]

        gradients = gradients[0]

        weights = tf.reduce_mean(
            gradients,
            axis=(0, 1),
        )

        heatmap = tf.reduce_sum(
            weights * conv_output,
            axis=-1,
        )

        heatmap = tf.nn.relu(
            heatmap
        )

        heatmap = heatmap.numpy()

        heatmap -= heatmap.min()

        heatmap /= (
            heatmap.max() + 1e-8
        )

        heatmap = cv2.resize(
            heatmap,
            (
                224,
                224,
            ),
        )

        return heatmap
    
    def overlay(
        self,
        original,
        heatmap,
        alpha=0.35,
    ):
        """
        Create Grad-CAM overlay.
        """

        if original.max() <= 1:

            original = (
                original * 255
            ).astype(np.uint8)

        heatmap_img = np.uint8(
            255 * heatmap
        )

        heatmap_img = cv2.applyColorMap(
            heatmap_img,
            cv2.COLORMAP_TURBO,
        )

        overlay = cv2.addWeighted(
            original,
            1 - alpha,
            heatmap_img,
            alpha,
            0,
        )

        return heatmap_img, overlay

    def save(
        self,
        original,
        heatmap,
        overlay,
        folder,
    ):
        """
        Save Grad-CAM results.
        """

        folder = Path(folder)

        folder.mkdir(
            parents=True,
            exist_ok=True,
        )

        cv2.imwrite(
            str(
                folder /
                "gradcam_heatmap.png"
            ),
            heatmap,
        )

        cv2.imwrite(
            str(
                folder /
                "gradcam_overlay.png"
            ),
            cv2.cvtColor(
                overlay,
                cv2.COLOR_RGB2BGR,
            ),
        )

        import matplotlib.pyplot as plt

        plt.figure(
            figsize=(15, 5)
        )

        plt.subplot(131)

        plt.imshow(original)

        plt.title(
            "Original"
        )

        plt.axis("off")

        plt.subplot(132)

        plt.imshow(
            heatmap,
            cmap="turbo",
        )

        plt.title(
            "Grad-CAM"
        )

        plt.axis("off")

        plt.subplot(133)

        plt.imshow(
            overlay
        )

        plt.title(
            "Overlay"
        )

        plt.axis("off")

        plt.tight_layout()

        plt.savefig(
            folder /
            "gradcam_visualization.png",
            dpi=300,
        )

        plt.close()
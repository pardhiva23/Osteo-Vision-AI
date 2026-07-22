"""
Feature Map Visualization
OsteoVision AI
"""

from pathlib import Path

import cv2
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt


class FeatureMapVisualizer:
    """
    Visualize intermediate CNN feature maps.
    """

    def __init__(self, model):

        self.model = model

        self.layer_names = [
            "stem_relu",
            "block1_output",
            "block2_output",
            "block3_output",
            "block4_output",
        ]

        self.feature_model = tf.keras.Model(
            inputs=model.input,
            outputs=[
                model.get_layer(name).output
                for name in self.layer_names
            ],
        )

    def visualize(
        self,
        image,
        folder,
        max_maps=6,
    ):
        """
        Save feature maps.
        """

        folder = Path(folder)

        folder.mkdir(
            parents=True,
            exist_ok=True,
        )

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

        feature_maps = self.feature_model.predict(
            image,
            verbose=0,
        )

        saved_images = []

        for layer_name, fmap in zip(
            self.layer_names,
            feature_maps,
        ):

            fmap = fmap[0]

            channels = min(
                fmap.shape[-1],
                max_maps,
            )

            fig = plt.figure(
                figsize=(12, 2)
            )

            for i in range(channels):

                plt.subplot(
                    1,
                    channels,
                    i + 1,
                )

                feature = fmap[:, :, i]

                feature -= feature.min()

                feature /= (
                    feature.max()
                    + 1e-8
                )

                plt.imshow(
                    feature,
                    cmap="viridis",
                )

                plt.axis("off")

            plt.suptitle(
                layer_name
            )

            filename = (
                folder /
                f"{layer_name}.png"
            )

            plt.tight_layout()

            plt.savefig(
                filename,
                dpi=250,
            )

            plt.close()

            saved_images.append(
                filename
            )

        self.combine_maps(
            saved_images,
            folder,
        )

    @staticmethod
    def combine_maps(
        images,
        folder,
    ):
        """
        Combine all saved feature maps into one image.
        """

        if not images:
            return

        loaded = []

        for image_path in images:

            img = cv2.imread(
                str(image_path)
            )

            if img is None:
                continue

            img = cv2.cvtColor(
                img,
                cv2.COLOR_BGR2RGB,
            )

            loaded.append(img)

        if not loaded:
            return

        columns = 2

        rows = int(
            np.ceil(
                len(loaded) / columns
            )
        )

        plt.figure(
            figsize=(
                10,
                rows * 3.5,
            )
        )

        for i, img in enumerate(
            loaded
        ):

            plt.subplot(
                rows,
                columns,
                i + 1,
            )

            plt.imshow(img)

            plt.axis("off")

            plt.title(
                Path(images[i]).stem,
                fontsize=10,
            )

        plt.tight_layout()

        plt.savefig(
            folder /
            "all_feature_maps.png",
            dpi=300,
        )

        plt.close()
"""
OsteoVision AI
Prediction Pipeline
"""

from pathlib import Path
import time
import cv2
import numpy as np
import tensorflow as tf

from src.config.settings import (
    IMAGE_SIZE,
    CLASS_NAMES,
    BEST_MODEL_PATH,
)

from src.explainability.gradcam import GradCAM
from src.explainability.feature_maps import FeatureMapVisualizer
from src.utils.artifact_manager import ArtifactManager


class OsteoVisionPredictor:
    """
    OsteoVision Prediction Pipeline
    """

    def __init__(self):

        self.model = tf.keras.models.load_model(
            BEST_MODEL_PATH
        )

        self.gradcam = GradCAM(self.model)

        self.feature_maps = FeatureMapVisualizer(
            self.model
        )

    def preprocess(self, image_path):
        """
        Read and preprocess image.
        Returns both original image and model input.
        """

        original = cv2.imread(str(image_path))

        if original is None:
            raise FileNotFoundError(
                f"Unable to read image: {image_path}"
            )

        original = cv2.cvtColor(
            original,
            cv2.COLOR_BGR2RGB,
        )

        original = cv2.resize(
            original,
            IMAGE_SIZE,
        )

        model_input = (
            original.astype(np.float32) / 255.0
        )

        model_input = np.expand_dims(
            model_input,
            axis=0,
        )

        return original, model_input

    def predict(self, image_path):
        """
        Predict Osteosarcoma class.
        """

        start = time.perf_counter()

        # -----------------------------------
        # Create Prediction Folder
        # -----------------------------------

        folder = ArtifactManager.create_prediction_folder()

        # -----------------------------------
        # Read Image
        # -----------------------------------

        original, img = self.preprocess(
            image_path
        )

        # -----------------------------------
        # Save Original
        # -----------------------------------

        ArtifactManager.save_original(
            image_path,
            folder,
        )

        # -----------------------------------
        # Prediction
        # -----------------------------------

        probabilities = self.model.predict(
            img,
            verbose=0,
        )[0]

        pred_idx = int(
            np.argmax(probabilities)
        )

        prediction = CLASS_NAMES[pred_idx]

        confidence = float(
            probabilities[pred_idx] * 100
        )

        inference_time = (
            time.perf_counter() - start
        ) * 1000

        probs = {
            CLASS_NAMES[i]: float(
                probabilities[i]
            )
            for i in range(
                len(CLASS_NAMES)
            )
        }

        # -----------------------------------
        # GradCAM
        # -----------------------------------

        heatmap = self.gradcam.generate(
            img,
            pred_idx,
        )

        heatmap_color, overlay = (
            self.gradcam.overlay(
                original,
                heatmap,
            )
        )

        self.gradcam.save(
            original,
            heatmap_color,
            overlay,
            folder,
        )

        # -----------------------------------
        # Feature Maps
        # -----------------------------------

        self.feature_maps.visualize(
            img,
            folder,
        )

        # -----------------------------------
        # Save Prediction Report
        # -----------------------------------

        self.save_prediction(
            folder=folder,
            image_path=image_path,
            prediction=prediction,
            confidence=confidence,
            probabilities=probs,
            inference_time=inference_time,
        )

        # -----------------------------------
        # Save Metadata
        # -----------------------------------

        metadata = {
            "image": Path(image_path).name,
            "prediction": prediction,
            "confidence": confidence,
            "probabilities": probs,
            "inference_time_ms": inference_time,
            "folder": folder.as_posix(),
            "model": "OsteoVisionNet",
        }

        ArtifactManager.save_metadata(
            folder,
            metadata,
        )

        return {
            "prediction": prediction,
            "confidence": confidence,
            "probabilities": probs,
            "inference_time": inference_time,
            "folder": folder.as_posix(),
        }
    
    @staticmethod
    def save_prediction(
        folder,
        image_path,
        prediction,
        confidence,
        probabilities,
        inference_time,
    ):
        """
        Save prediction report.
        """

        report = [
            "=" * 60,
            "OSTEOVISION AI",
            "=" * 60,
            "",
            f"Image           : {Path(image_path).name}",
            f"Prediction      : {prediction}",
            f"Confidence      : {confidence:.2f} %",
            f"Inference Time  : {inference_time:.2f} ms",
            "",
            "Probabilities",
            "-" * 60,
        ]

        for cls, prob in probabilities.items():

            report.append(
                f"{cls:<22} {prob:.4f}"
            )

        report.extend(
            [
                "",
                "=" * 60,
                "Generated by OsteoVision AI",
                "=" * 60,
            ]
        )

        with open(
            folder / "prediction.txt",
            "w",
            encoding="utf-8",
        ) as file:

            file.write(
                "\n".join(report)
            )
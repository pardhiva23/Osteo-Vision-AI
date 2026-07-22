"""
Debug Predictor
"""

from src.inference.predictor import OsteoVisionPredictor

IMAGE_PATH = "example/sample.jpg"   # <-- change this

predictor = OsteoVisionPredictor()

result = predictor.predict(IMAGE_PATH)

print("\n" + "=" * 60)
print("OSTEOVISION AI")
print("=" * 60)

print(f"\nPrediction : {result['prediction']}")
print(f"Confidence : {result['confidence']:.2f}%")

print("\nProbabilities")

for cls, prob in result["probabilities"].items():
    print(f"{cls:<20} : {prob:.4f}")

print(f"\nInference Time : {result['inference_time']:.2f} ms")

print("\nOutputs saved in:")

print("artifacts/gradcam/")
print("artifacts/predictions/")
# OsteoVision AI

AI-powered web app for **osteosarcoma histopathology analysis**. Upload a slide image and get a
3-class prediction (Non-Tumor / Non-Viable-Tumor / Viable) from a custom residual CNN, with Grad-CAM
and feature-map explanations, plus a Gemini-powered assistant that can explain the result.

> Educational / research use only. Not a medical device and not a substitute for professional diagnosis.

## Project structure

```
app/            FastAPI backend (auth, prediction, chat, database)
src/            ML code: model, training, evaluation, inference, Grad-CAM
artifacts/      Trained model (models/best_model.keras), evaluation figures and reports
frontend/       React + Vite + Tailwind frontend
example/        Sample image for quick testing
uploads/        Temporary upload folder (files are deleted after prediction)
```

## Run it

You need **Python 3.10 - 3.12** and **Node.js 18+**. Open two terminals in the project root.

### 1. Backend (http://localhost:8000)

```bash
python -m venv .venv
# Windows:  .venv\Scripts\activate        macOS/Linux:  source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env        # Windows: copy .env.example .env
# edit .env: set SECRET_KEY, and GEMINI_API_KEY if you want the chat assistant

uvicorn app.main:app --reload
```

The database (`osteovision.db`) is created automatically on first start.
Interactive API docs: http://localhost:8000/docs

### 2. Frontend (http://localhost:5173)

```bash
cd frontend
cp .env.example .env        # Windows: copy .env.example .env
npm install
npm run dev
```

Open http://localhost:5173, create an account, log in, then upload an image (try `example/sample.jpg`)
and press send.

## How frontend and backend are connected

| Frontend action            | API call                         | Notes                                   |
|----------------------------|----------------------------------|-----------------------------------------|
| Register                   | `POST /auth/register`            | username, email, password               |
| Login                      | `POST /auth/login`               | form-encoded; returns JWT (stored in `localStorage`) |
| Current user (sidebar)     | `GET /users/me`                  | Bearer token                            |
| Upload image + send        | `POST /prediction/predict`       | multipart `file`; returns class, confidence, probabilities, image URLs |
| Recent scans (sidebar)     | `GET /prediction/history`        |                                         |
| Chat message               | `POST /chat/`                    | `{ message, prediction_id }`            |
| Grad-CAM / feature maps    | `GET /media/predictions/...`     | static files served by the backend      |

The frontend reads the backend address from `VITE_API_URL` (`frontend/.env`). The backend allows the
frontend origin through `CORS_ORIGINS` (`.env`); add your URL there if you deploy the frontend elsewhere.

## Notes

- **Chat** needs a `GEMINI_API_KEY`. Without it, everything else works and chat shows a clear error.
- **Forgot password / OTP / reset password** pages are UI only; the backend has no endpoints for them yet.
- The first prediction after startup is slower because the TensorFlow model loads then.
- To retrain, put your dataset in `data/raw/dataset/{train,validate,test}/<class>/` and run
  `python -m src.training.train` (the dataset is not included in this repo).

## Model performance (test set, 177 images)

Accuracy 85.3%, macro F1 0.847. See `artifacts/reports/` and `artifacts/figures/`.

## Author

**Pardhiva Reddy** - B.Tech Computer Science (AI, Computer Vision, Deep Learning, Medical AI)

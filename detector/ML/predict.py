import joblib
from pathlib import Path

ML_DIR = Path(__file__).resolve().parent

model = joblib.load(ML_DIR / "phishing_model.joblib")
vectorizer = joblib.load(ML_DIR / "tfidf_vectorizer.joblib")

def predict_email(text):
    text_vector = vectorizer.transform([text])
    prediction = model.predict(text_vector)[0]

    return int(prediction)
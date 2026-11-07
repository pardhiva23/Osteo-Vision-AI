import api from "./api";

export async function predictImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/prediction/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}

export async function getPredictionHistory() {
  const { data } = await api.get("/prediction/history");

  return data;
}

export async function deletePrediction(id) {
  const { data } = await api.delete(`/prediction/${id}`);

  return data;
}

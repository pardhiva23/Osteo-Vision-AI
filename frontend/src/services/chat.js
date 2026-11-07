import api from "./api";

export async function sendChatMessage(message, predictionId = null) {
  const { data } = await api.post("/chat/", {
    message,
    prediction_id: predictionId,
  });

  return data.response;
}

export async function getChatHistory() {
  const { data } = await api.get("/chat/history");

  return data;
}

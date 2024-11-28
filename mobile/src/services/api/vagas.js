import api from "./api";

export async function getVagas() {
  const response = await api.get("/");
  return response;
}

export async function getVaga(id) {
  const response = await api.get(`/${id}`);
  return response;
}

export async function createVaga(data) {
  const response = await api.post("/", data);
  return response;
}

export async function updateVaga(id, data) {
  const response = await api.put(`/${id}`, data);
  return response;
}

export async function deleteVaga(id) {
  const response = await api.delete(`/${id}`);
  return response;
}

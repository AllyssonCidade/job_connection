import api from "./api";

export async function getVagas() {
  const response = await api.get("/");
  return response;
}

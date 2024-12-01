import { vagasApi } from "./api";

export async function getVagas() {
  const response = await vagasApi.get("/");
  return response;
}

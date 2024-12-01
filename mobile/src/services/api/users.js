import { userApi } from "./api";

//FUNÇÃO PARA LOGIN
export async function getUser(email, password) {
  try {
    const response = await userApi.post("/login", { email, password });
    return response;
  } catch (error) {
    console.error("Erro na obtenção de usuário:", error);
    throw error;
  }
}

//FUNÇÕES DE CADASTRO
export async function createUser({ name, email, password }) {
  try {
    const response = await userApi.post("/", { name, email, password });
    return response;
  } catch (error) {
    console.error("Erro na criação de usuário:", error);
    throw error;
  }
}

//FUNÇÕES DE EDIÇÃO DE USUARIO
export async function updateUser(id, { name, email, password }) {
  try {
    const response = await userApi.put(`/${id}`, { name, email, password });
    return response;
  } catch (error) {
    console.error("Erro na edição de usuário:", error);
    throw error;
  }
}

//FUNÇÕES DE DELETAÇÃO DE USUARIO
export async function deleteUser(id) {
  const response = await userApi.delete(`/${id}`);
  return response;
}

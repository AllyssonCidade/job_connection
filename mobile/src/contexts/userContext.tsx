import { createContext, useState } from "react";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../services/api/users";
import { userProps } from "../utils/types.module";

export const UserContext = createContext<any>({});

export const UsersProvider = ({ children }: any) => {
  const [user, setUser] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Função para login de usuários
  async function readUser({ email, password }: userProps) {
    setIsLoading(true);
    try {
      const response = await getUser({ email, password });
      setUser(response?.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Função para criar usuários
  async function criarUsuario({ name, email, password }: userProps) {
    try {
      const response = await createUser({ name, email, password });
      console.log("Usuário criado com sucesso:", response.data);
      setUser(response.data);
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
    }
  }

  // Função para editar usuários
  async function onUpdateUser(
    id: string,
    { name, email, password }: userProps
  ) {
    try {
      const response = await updateUser(id, { name, email, password });
      console.log("Usuário atualizado com sucesso:", response);
      setUser((prevUsers) =>
        prevUsers.map((u) => (u.id === id ? { ...u, ...user } : u))
      );
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
    }
  }

  //função para deletar usuário
  async function onDeleteUser(id: string) {
    try {
      const response = await deleteUser(id);
      console.log("Usuário deletado com sucesso:", response);
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        readUser,
        criarUsuario,
        onUpdateUser,
        onDeleteUser,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

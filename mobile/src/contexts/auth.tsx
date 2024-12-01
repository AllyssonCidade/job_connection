import { createContext, useState } from "react";
import {
  createUser,
  getUser,
  deleteUser,
  updateUser as updateUserAPI,
} from "../services/api/users";
import { userProps } from "../utils/types.module";

type AuthContextProps = {
  user: userProps | null;
  isAuthenticated: boolean;
  signIn: ({ email, password }: userProps) => Promise<any>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = async ({ email, password }: userProps) => {
    try {
      const user = await getUser(email, password).then((res) => res?.data);
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        return { success: true, user };
      } else {
        return {
          success: false,
          error: "Usuário não encontrado ou senha incorreta.",
        };
      }
    } catch (error) {
      return { success: false, error: "Erro no processo de login." };
    }
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

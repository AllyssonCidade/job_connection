import { createContext, useState, useEffect } from "react";
import { getUser, updateUser as updateUserAPI } from "../services/api/users";
import { userProps } from "../utils/types.module";
import {
  saveUserCredentials,
  getUserCredentials,
  removeUserCredentials,
} from "../services/auth";

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
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      const credentials = await getUserCredentials();
      console.log("Credenciais encontradas no armazenamento:", credentials);

      if (credentials) {
        const { email, password } = credentials;
        console.log("Tentando login automático com:", email, password);
        try {
          const response = await signIn({ email, password });
          // const response = await getUser(email, password);
          if (response.user) {
            setUser(response.user);
            setIsAuthenticated(true);
            console.log("Login automático bem-sucedido!");
          } else {
            console.error("Usuário não encontrado");
          }
        } catch (error) {
          console.error("Erro ao fazer login automático:", error);
        }
      } else {
        console.log("Credenciais não encontradas no armazenamento");
      }
      setInitializing(false);
    };

    initApp();
  }, []);

  const signIn = async ({ email, password }: userProps) => {
    try {
      const user = await getUser(email, password).then((res) => res?.data);
      if (user) {
        saveUserCredentials(email, password);
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
    removeUserCredentials();
    setUser(null);
    setIsAuthenticated(false);
  };

  if (initializing) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

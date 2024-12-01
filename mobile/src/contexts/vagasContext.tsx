import { createContext, useEffect, useState } from "react";
import { getVagas } from "../services/api/vagas";

export const VagasContext = createContext<any>({});

export const VagasProvider = ({ children }: any) => {
  const [vagas, setVagas] = useState<any[]>([]);
  useEffect(() => {
    fetchVagas();
  }, []);

  async function fetchVagas() {
    try {
      const response = await getVagas();
      setVagas(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <VagasContext.Provider value={{ vagas, fetchVagas }}>
      {children}
    </VagasContext.Provider>
  );
};

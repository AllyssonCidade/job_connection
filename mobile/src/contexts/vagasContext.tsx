import { createContext, useEffect, useState } from "react";
import { usevagasDatabase } from "../database/useVagasDatabase";

export const VagasContext = createContext<any>({});

export const VagasProvider = ({ children }: any) => {
  const [vagas, setVagas] = useState<any[]>([]);
  const { filterVaga } = usevagasDatabase();
  const [notifications, setNotifications] = useState<any[]>([]);

  const onFilter = async (stats: string, data: string) => {
    try {
      const response = await filterVaga(stats, data);
      setVagas(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const vagaNotification = () => {
      const newNotifications = vagas.filter((vaga: any) => {
        const [day, month, year] = vaga.data.split("/");
        const vagaDate = new Date(`${year}-${month}-${day}`);
        const currentDate = new Date();
        return vagaDate < currentDate && vaga.stats === "Em Aberto";
      });
      setNotifications(newNotifications);
    };

    vagaNotification();
  }, [vagas]);

  return (
    <VagasContext.Provider value={{ onFilter, vagas, notifications }}>
      {children}
    </VagasContext.Provider>
  );
};

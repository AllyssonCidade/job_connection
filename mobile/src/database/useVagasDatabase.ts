import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { vagasProps } from "../utils/types.module";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export function usevagasDatabase() {
  //retornando o db que foi iniciado em initializeDatabase.ts
  const db = useSQLiteContext();
  const { user } = useContext(AuthContext);

  // funcao para criar a tarefa
  async function createVaga(data: Omit<vagasProps, "id">) {
    const statement = await db.prepareAsync(
      "INSERT INTO myVaga (titulo,descricao,dataCadastro,stats,userId) VALUES ($titulo,$descricao,$dataCadastro,$stats,$userId)"
    );
    const userId = user?.id;
    if (!userId) {
      throw new Error("User ID is undefined");
    }
    try {
      const result = await statement.executeAsync({
        $titulo: data.titulo,
        $descricao: data.descricao,
        $data: data.dataCadastro,
        $stats: "Em Aberto",
        $userId: userId,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();

      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  //função para puxar e filtrar as tarefas
  const filterVaga = async (data: string, stats: string) => {
    const userId = user?.id;
    if (!userId) {
      throw new Error("User ID is undefined");
    }
    try {
      if (data === "" && stats === "") {
        const query = "SELECT * FROM myVaga WHERE userId = ?";
        const response = await db.getAllAsync<vagasProps>(query, userId);
        return response;
      }

      if (stats === "" && data !== "") {
        const query = "SELECT * FROM myVaga WHERE data LIKE ? AND userId = ?";
        const response = await db.getAllAsync<vagasProps>(
          query,
          `%${data}%`,
          userId
        );
        return response;
      }

      const query =
        "SELECT * FROM myVaga WHERE stats LIKE ? AND data LIKE ? AND userId = ?";
      const response = await db.getAllAsync<vagasProps>(
        query,
        stats,
        `%${data}%`,
        userId
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  //funcao para alterar vaga
  async function updateVaga(data: vagasProps) {
    const statement = await db.prepareAsync(
      "UPDATE myVaga SET titulo= $titulo ,descricao= $descricao ,data= $data ,horaInicio= $horaInicio ,horaFim= $horaFim, cor = $cor WHERE id = $id"
    );
    try {
      await statement.executeAsync({
        $id: data.id,
        $titulo: data?.titulo,
        $descricao: data?.descricao,
        $data: data?.dataCadastro,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  //altera o estatus da tarefa (concluido/em andamento)
  async function toggleStats(data: any) {
    const statement = await db.prepareAsync(
      "UPDATE myVaga SET stats= $stats WHERE id = $id"
    );
    try {
      await statement.executeAsync({
        $id: data.id,
        $stats: data.stats,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  //função para excluir uma vaga
  async function deletVagas(id: string) {
    try {
      const query = "DELETE FROM myVaga WHERE id = ?";
      await db.runAsync(query, id);
      console.log("Tarefa deletada com sucesso!" + id);
    } catch (error) {
      console.error("Erro ao recuperar as tarefas:", error);
      return [];
    }
  }

  //função para excluir toda a tabela(consequentemente todas as vagas)
  function deletTable() {
    try {
      const query = "DROP TABLE IF EXISTS myVaga";
      db.execAsync(query);
      console.log("sucesso!");
    } catch (error) {
      console.error("Erro");
      return [];
    }
  }

  return {
    createVaga,
    updateVaga,
    deletVagas,
    filterVaga,
    toggleStats,
    deletTable,
  };
}

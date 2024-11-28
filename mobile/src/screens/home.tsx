import { Buttom } from "@/src/components/Buttom";
import React, { useContext, useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { FlatList, StyleSheet, Text, View, Modal } from "react-native";
import { PropsScreensApp } from "../routes/interfaces";
import { vagasProps } from "../utils/types.module";
import { useFocusEffect } from "expo-router";
import { AuthContext } from "../contexts/auth";
import { VagasContext } from "../contexts/vagasContext";
import { getVagas } from "../services/api/vagas";
import { Vaga } from "../components/Vagas";
import { ModalVaga } from "../components/ModalVaga";

export const Home = ({ navigation }: PropsScreensApp) => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState("");
  const [stats, setStats] = useState("");
  const { notifications } = useContext(VagasContext);
  const { onFilter } = useContext(VagasContext);
  const [vagas, setVagas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVaga, setSelectedVaga] = useState<vagasProps | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      onFilter("", "");
    }, [user])
  );

  useEffect(() => {
    onFilter(data, stats);
  }, [stats, data]);

  async function fetchVagas() {
    try {
      const response = await getVagas();
      setVagas(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  function handleVagaPress(item: vagasProps) {
    setSelectedVaga(item);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerFull}>
        <View
          style={{
            paddingHorizontal: 15,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18 }}>Olá, {user?.nome}</Text>
          <View
            style={{
              gap: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Feather
              onPress={() => navigation.navigate("Settings")}
              name="settings"
              size={35}
              fil
              color="black"
            />
          </View>
        </View>

        <Buttom size="xlarge" onPress={() => fetchVagas()}>
          Refresh Vagas
        </Buttom>
        <FlatList
          style={{ width: "100%" }}
          data={vagas}
          keyExtractor={(item: vagasProps) => item.id}
          renderItem={({ item }) => (
            <Vaga
              id={item.id}
              stats={item.stats}
              descricao={item.descricao}
              title={item.titulo}
              data={item.dataCadastro}
              onPress={() => handleVagaPress({ ...item })}
            />
          )}
        />
        <ModalVaga
          vaga={{
            titulo: selectedVaga?.titulo || "",
            id: selectedVaga?.id || "",
            stats: selectedVaga?.stats || "",
            descricao: selectedVaga?.descricao || "",
            dataCadastro: selectedVaga?.dataCadastro || "",
            empresa: selectedVaga?.empresa || "",
            telefone: selectedVaga?.telefone || "",
          }}
          modalVisible={modalVisible}
          OnPressCloseModal={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f5f5f5",
  },
  containerFull: {
    height: "100%",
    alignItems: "center",
    gap: 24,
    marginBottom: 160,
  },
  notificationContainer: {
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    right: 2,
    top: -2,
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    textAlign: "center",
    alignContent: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 12,
  },
  modalView: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    width: "100%",
    height: 400,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
  },
});

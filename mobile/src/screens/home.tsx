import React, { useContext, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PropsScreensApp } from "../routes/interfaces";
import { vagasProps } from "../utils/types.module";
import { AuthContext } from "../contexts/auth";
import { VagasContext } from "../contexts/vagasContext";
import { Vaga } from "../components/Vagas";
import { ModalVaga } from "../components/ModalVaga";
import InputField from "../components/inputField";

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const Home = ({ navigation }: PropsScreensApp) => {
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const { vagas, fetchVagas } = useContext(VagasContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVaga, setSelectedVaga] = useState<vagasProps | null>(null);
  const [filteredVagas, setFilteredVagas] = useState<vagasProps[]>(vagas);

  function handleVagaPress(item: vagasProps) {
    setSelectedVaga(item);
    setModalVisible(true);
  }

  async function handleRefresh() {
    await fetchVagas();
    setFilteredVagas(vagas);
    setValue("");
  }

  async function searchVaga(text: string) {
    setValue(text);
    const filtered = vagas.filter((vaga: any) =>
      vaga.titulo.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredVagas(filtered);
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
          <Text style={{ fontSize: 18 }}>Olá, {user?.name}</Text>
          <View
            style={{
              gap: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Feather
              onPress={() => navigation.navigate("Settings")}
              name="menu"
              size={35}
              color="black"
            />
          </View>
        </View>
        <Text style={styles.title}>Job Connection</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
            }}
          >
            <InputField
              value={value}
              placeholder="Buscar vaga"
              types="text"
              onChangeText={searchVaga}
            />
            <Feather
              name="search"
              size={24}
              color="black"
              style={{ position: "absolute", right: 10, bottom: 10 }}
            />
          </View>
          <Feather
            style={{ alignSelf: "flex-end", padding: 10 }}
            name="refresh-ccw"
            size={24}
            color="black"
            onPress={handleRefresh}
          />
        </View>

        <FlatList
          style={{ width: "100%" }}
          data={filteredVagas.length > 0 ? filteredVagas : vagas}
          keyExtractor={(item: vagasProps) => item.id}
          renderItem={({ item }) => (
            <Vaga
              id={item.id}
              stats={item.stats}
              descricao={item.descricao}
              title={item.titulo}
              data={formatDate(item.dataCadastro)}
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
    gap: 14,
    marginBottom: 160,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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

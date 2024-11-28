import { vagasProps } from "@/src/utils/types.module";
import { Feather } from "@expo/vector-icons";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Buttom } from "../Buttom";
import { Linking } from "react-native";

export type ModalVagaProps = {
  modalVisible?: boolean;
  OnPressCloseModal?: () => void;
  vaga: vagasProps | null;
};

export function ModalVaga({
  modalVisible,
  OnPressCloseModal,
  vaga,
}: ModalVagaProps) {
  function handleWhatsApp() {
    const message = `Olá, estou interessado na vaga: ${vaga?.titulo} que foi publicada em: ${vaga?.dataCadastro}`;
    const url = `https://wa.me/55${vaga?.telefone}?text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir o WhatsApp", err)
    );
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalView}>
        <Feather
          style={styles.closeButton}
          onPress={OnPressCloseModal}
          name="x"
          size={25}
          color="black"
        />
        <Text style={styles.title}>{vaga?.titulo}</Text>
        <ScrollView
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 10,
            marginBottom: 50,
          }}
        >
          <Text style={styles.description}>
            <Text style={styles.strong}>Empresa: </Text>
            {vaga?.empresa}
          </Text>
          <Text style={styles.description}>
            <Text style={styles.strong}>Descrição: </Text> {vaga?.descricao}
          </Text>
        </ScrollView>
        <Buttom
          style={styles.whatsappButton}
          size="xlarge"
          onPress={handleWhatsApp}
        >
          <Text>Entrar em contato</Text>
          <Feather name="external-link" size={25} color="black" />
        </Buttom>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  modalView: {
    alignSelf: "center",
    backgroundColor: "white",
    flexDirection: "column",
    borderRadius: 20,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    width: "100%",
    height: 400,
    paddingVertical: 35,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    gap: 20,
  },
  whatsappButton: {
    position: "absolute",
    bottom: 20,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    alignSelf: "flex-start",
    textAlign: "left",
    fontSize: 16,
    marginBottom: 10,
  },
  strong: {
    fontWeight: "bold",
  },
});

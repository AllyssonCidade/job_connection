import { Text, StyleSheet, Image, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { PropsScreensApp } from "../routes/interfaces";

export const PoliticaPrivacidade = ({ navigation }: PropsScreensApp) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Feather
            name="arrow-left-circle"
            size={40}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 50 }}>
          Política de Privacidade
        </Text>
        <Text style={styles.paragraph}>
          Respeitamos sua privacidade e estamos comprometidos em proteger as
          informações pessoais que você compartilha conosco. No JobConnect, os
          dados coletados são utilizados exclusivamente para melhorar sua
          experiência na busca e no gerenciamento de vagas de emprego.
        </Text>
        <Text style={styles.paragraph}>
          Garantimos que nenhuma informação pessoal será compartilhada com
          terceiros sem o seu consentimento explícito. Além disso, todas as suas
          informações são tratadas com segurança e de acordo com as melhores
          práticas de proteção de dados.
        </Text>
        <Text style={styles.paragraph}>
          Dúvidas ou sujestões, entre em contato com nossa equipe de suporte
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    paddingBottom: 0,
    alignItems: "center",
    gap: 40,
  },
  circles: {
    position: "absolute",
    left: -77,
    height: 243,
    width: 270,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paragraph: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 16,
    paddingHorizontal: 20,
  },
});

export default PoliticaPrivacidade;

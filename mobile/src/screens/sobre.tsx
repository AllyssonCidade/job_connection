import { Text, StyleSheet, Image, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { PropsScreensApp } from "../routes/interfaces";

export const Sobre = ({ navigation }: PropsScreensApp) => {
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
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 50,
            paddingHorizontal: 20,
          }}
        >
          Sobre o JobConnect!
        </Text>
        <Text style={styles.paragraph}>
          Nosso objetivo é conectar você às melhores oportunidades de emprego,
          simplificando sua jornada profissional.
        </Text>
        <Text style={styles.paragraph}>Com o JobConnect, você pode:</Text>
        <Text style={styles.paragraph}>
          Encontrar oportunidades de emprego de acordo com suas habilidades
        </Text>
        <Text style={styles.paragraph}>
          Entrar em contato diretamente com recrutadores.
        </Text>
        <Text style={styles.paragraph}>
          Gerenciar seu perfil de forma fácil e rápida.
        </Text>
        <Text style={styles.paragraph}>
          Este aplicativo foi desenvolvido com foco na praticidade e na
          acessibilidade, utilizando tecnologias modernas e seguras.
        </Text>
        <Text style={styles.paragraph}>
          Agradecemos por fazer parte dessa experiência. Boa sorte em sua
          jornada profissional! 🚀
        </Text>
        <Text style={styles.paragraph}>Equipe JobConnect</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  circles: {
    position: "absolute",
    left: -137,
    height: 243,
    width: 270,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paragraph: {
    textAlign: "left",
    marginBottom: 15,
    fontSize: 16,
    paddingHorizontal: 20,
  },
});

export default Sobre;

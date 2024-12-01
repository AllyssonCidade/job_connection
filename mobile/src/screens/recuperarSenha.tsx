import React, { useState } from "react";
import { PropsScreensApp } from "../routes/interfaces";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import InputField from "../components/inputField";
import { Buttom } from "../components/Buttom";
import LoadingScreen from "../components/loading/loginLoading";

function RecuperarSenha({ navigation }: PropsScreensApp) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    setIsLoading(true);
    setErrorMessage("");
    // try {
    //   // const response = await recuperaSenha({ email, nome });
    //   if (response) {
    //     setSenha(response);
    //   } else {
    //     setErrorMessage("Nome ou e-mail não encontrados.");
    //   }
    // } catch (error) {
    //   console.error("Erro ao recuperar senha:", error);
    //   setErrorMessage(
    //     "Ocorreu um erro. Verifique se o usuário e nome estão corretos."
    //   );
    // }
    setIsLoading(false);
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(senha);
    Alert.alert(
      "Senha copiada!",
      "A senha foi copiada para sua área de transferência."
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Image
            source={require("@/assets/images/job.png")}
            style={styles.image}
          />
          <View style={styles.containerFull}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
            >
              Recuperar Senha
            </Text>

            {senha ? (
              <View style={styles.senhaContainer}>
                <Text style={styles.senhaTexto}>Sua nova senha é:</Text>
                <Text style={styles.senha}>{senha}</Text>

                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={copyToClipboard}
                >
                  <Text style={styles.copyButtonText}>Copiar Senha</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.inputContainer}>
                <InputField
                  value={email}
                  onChangeText={setEmail}
                  titulo="E-mail"
                  placeholder="Digite seu e-mail"
                  types="text"
                />
                <InputField
                  value={nome}
                  onChangeText={setNome}
                  titulo="Nome"
                  placeholder="Digite seu nome"
                  types="text"
                />
                {errorMessage ? (
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : null}
                <Buttom size="xlarge" onPress={handleSubmit}>
                  Enviar
                </Buttom>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flex: 1,
  },
  containerFull: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inputContainer: {
    width: "90%",
    alignItems: "center",
    marginBottom: 40,
    gap: 30,
  },
  senhaContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  senhaTexto: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  senha: {
    fontSize: 24,
    color: "#f00",
    fontWeight: "bold",
  },
  copyButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  copyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: "40%",
  },
});

export default RecuperarSenha;

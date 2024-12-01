import React, { useContext } from "react";
import { Image, Text, View, StyleSheet, Alert } from "react-native";
import { PropsScreensApp } from "../routes/interfaces";
import { Buttom } from "../components/Buttom";
import { useForm, Controller } from "react-hook-form";
import InputField from "../components/inputField";
import { UserContext } from "../contexts/userContext";
import { userProps } from "../utils/types.module";

interface FormData {
  email: string;
  name: string;
  password: string;
  confirmpassword: string;
}

export default function Cadastro({ navigation }: PropsScreensApp) {
  const { criarUsuario } = useContext(UserContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmpassword: "",
    },
  });

  const onCreatUser = async ({ name, email, password }: userProps) => {
    try {
      await criarUsuario({ name, email, password });
      Alert.alert("Cadastro realizado com sucesso!!!");
      navigation.navigate("Login");
    } catch (error: any) {
      if (error.message === "Email já cadastrado") {
        Alert.alert("Erro", "Email já está cadastrado!");
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao cadastrar o usuário.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/job.png")} style={styles.image} />
      <View style={styles.containerFull}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Seja Bem-vindo</Text>
        <Text>Vamos te ajudar a conseguir sua vaga.</Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "name é obrigatório",
              minLength: {
                value: 3,
                message: "O name deve ter no mínimo 3 letras",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                onChangeText={onChange}
                value={value}
                placeholder="Digite seu name"
                types="text"
              />
            )}
          />
          {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )}

          <Controller
            control={control}
            name="email"
            rules={{
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "E-mail inválido",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                onChangeText={onChange}
                value={value}
                placeholder="Digite seu e-mail"
                types="text"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            name="password"
            rules={{
              required: "password é obrigatória",
              minLength: {
                value: 6,
                message: "A password deve ter no mínimo 6 caracteres",
              },
              validate: {
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) ||
                  "A password deve conter pelo menos 1 letra maiúscula",
                hasNumber: (value) =>
                  /\d/.test(value) ||
                  "A password deve conter pelo menos 1 número",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                secureTextEntry
                onChangeText={onChange}
                value={value}
                placeholder="Digite sua password"
                types="text"
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          <Controller
            control={control}
            name="confirmpassword"
            rules={{
              required: "Confirmação de password é obrigatória",
              validate: (value) =>
                value === getValues("password") || "As passwords não coincidem",
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                secureTextEntry
                onChangeText={onChange}
                value={value}
                placeholder="Digite novamente sua password"
                types="text"
              />
            )}
          />
          {errors.confirmpassword && (
            <Text style={styles.errorText}>
              {errors.confirmpassword.message}
            </Text>
          )}
        </View>
        <Buttom size="xlarge" onPress={handleSubmit(onCreatUser)}>
          Cadastrar
        </Buttom>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={styles.p}>Já possui conta?</Text>
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("Login")}
          >
            Entrar
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  containerFull: {
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    width: "90%",
    alignItems: "flex-end",
    marginBottom: 10,
    marginTop: -20,
  },
  errorText: {
    color: "red",
    marginBottom: -19,
    alignSelf: "flex-start",
  },
  linkText: {
    color: "blue",
    marginTop: 8,
  },
  p: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 5,
  },
  image: {
    width: "100%",
    height: "40%",
  },
});

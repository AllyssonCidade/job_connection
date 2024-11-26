import React, { useContext } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { PropsStackRoutes } from "../routes/interfaces";
import { Feather } from "@expo/vector-icons";
import InputField from "../components/inputField/index";
import { Buttom } from "../components/Buttom";
import { useForm, Controller } from "react-hook-form";
import { usetasksDatabase } from "../database/useTasksDatabase";
import { AuthContext } from "../contexts/auth";

const AdicionarTask = ({ navigation, route }: PropsStackRoutes | any) => {
  const { cargo, id, nota, data, horaInicio, horaFim, cor, whatsapp }: any =
    route.params || undefined;
  const { updateTask } = usetasksDatabase();
  const { createTask } = usetasksDatabase();
  const { user } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onSubmit(data: any) {
    try {
      if (route.params?.id) {
        const response = await updateTask({ ...data, id: route.params.id });
        navigation.navigate("Home");
      } else {
        const response = await createTask(data);
        Alert.alert("Task cadastrada com o ID: " + response.insertedRowId);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Adicionar Vaga</Text>
        <Feather
          style={{ alignSelf: "flex-start" }}
          name="arrow-left-circle"
          size={40}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          defaultValue={route.params ? cargo : ""}
          rules={{
            maxLength: 40,
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              types="text"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              titulo={"Cargo"}
              placeholder={"Digite o cargo"}
            >
              {cargo}
            </InputField>
          )}
          name="cargo"
        />
        {errors.cargo && (
          <Text style={styles.erro}>
            O cargo deve ter entre 1 e 40 caracters
          </Text>
        )}

        <Controller
          control={control}
          name="nota"
          defaultValue={route.params ? nota : ""}
          rules={{
            maxLength: 40,
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputField
              types="text"
              titulo={"Nota"}
              placeholder={"Digite a vaga"}
              onChangeText={onChange}
              value={value}
            >
              {nota}
            </InputField>
          )}
        />

        <Controller
          control={control}
          name="Whatsapp"
          defaultValue={route.params ? whatsapp : ""}
          rules={{
            maxLength: 40,
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputField
              types="text"
              titulo={"whatsapp"}
              placeholder={"Informe o número para contato"}
              onChangeText={onChange}
              value={value}
              isRequired
            >
              {whatsapp}
            </InputField>
          )}
        />

        {errors.nota && (
          <Text style={styles.erro}>
            A vaga deve ter entre 1 e 40 caracters
          </Text>
        )}
        <Controller
          control={control}
          defaultValue={route.params ? route.params.data : ""}
          name="data"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputField
              types="date"
              titulo={"Data Limite"}
              placeholder={"Informe a data"}
              onChangeText={onChange}
              value={value}
            >
              {data}
            </InputField>
          )}
        />
        {errors.data && (
          <Text style={styles.erro}>Informe uma data limite.</Text>
        )}
      </View>

      <Buttom size="xlarge" title="Submit" onPress={handleSubmit(onSubmit)}>
        {route.params.id ? "Editar vaga" : "Criar vaga"}
      </Buttom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    alignItems: "center",
    gap: 40,
  },
  header: {
    display: "flex",
    width: "100%",
  },

  title: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    display: "flex",
    gap: 20,
  },
  time: {
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  erro: {
    marginTop: -15,
    color: "red",
    fontWeight: "light",
  },
  section: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
});

export default AdicionarTask;

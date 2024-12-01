import AsyncStorage from "@react-native-async-storage/async-storage";

const saveUserCredentials = async (email, password) => {
  try {
    await AsyncStorage.setItem(
      "userCredentials",
      JSON.stringify({ email, password })
    );
    console.log("credenciais salvas", { email, password });
  } catch (error) {
    console.error("Erro ao salvar as credenciais do usuário:", error);
  }
};

const getUserCredentials = async () => {
  try {
    const credentials = await AsyncStorage.getItem("userCredentials");
    return credentials ? JSON.parse(credentials) : null;
  } catch (error) {
    console.error("Erro ao obter as credenciais do usuário:", error);
  }
};

const removeUserCredentials = async () => {
  try {
    await AsyncStorage.removeItem("userCredentials");
  } catch (error) {
    console.error("Erro ao remover as credenciais do usuário:", error);
  }
};

export { saveUserCredentials, getUserCredentials, removeUserCredentials };

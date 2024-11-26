import { View, StyleSheet, Image, Text, Animated } from "react-native";
import { PropsScreensApp } from "../routes/interfaces";
import { Buttom } from "../components/Buttom";
import { useEffect, useRef } from "react";

export const SplashScreen = ({ navigation }: PropsScreensApp) => {
  const currentDate = new Date();
  const monthName = currentDate.toLocaleDateString("pt-BR", { month: "long" });
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${monthName} ${day}, ${year}`;

  //Animação sutil na imagem.
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.05,
          duration: 8000,
          useNativeDriver: false,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: false,
        }),
      ]).start(() => animate());
    };
    animate();
  }, [scaleValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.data}>{formattedDate}</Text>
      <Text style={styles.h1}>Tela inicial</Text>
      <View style={styles.buttom}>
        <Buttom size="xlarge" onPress={() => navigation.navigate("Login")}>
          Começar agora
        </Buttom>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttom: {
    marginBottom: 50,
  },
  h1: {
    fontSize: 20,
    fontWeight: "bold",
  },
  data: {
    fontSize: 16,
    textAlign: "left",
    top: 40,
    left: 20,
    position: "absolute",
  },
});

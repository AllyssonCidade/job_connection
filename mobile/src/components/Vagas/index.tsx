import { GestureResponderEvent, View } from "react-native";
import { Container, Text, Title, ViewFlexColumn, ViewFlexRow } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

interface VagaProps {
  title?: string;
  telefone?: string;
  descricao?: string;
  stats?: string;
  data?: string;
  id?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export function Vaga({
  title,
  descricao,
  data,
  stats,
  telefone,
  onPress,
}: VagaProps) {
  return (
    <Container style={{ backgroundColor: "white" }} onPress={onPress}>
      <ViewFlexColumn>
        <Title numberOfLines={1}>{title}</Title>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text>{data}</Text>
        </View>
        <Text numberOfLines={2}>{descricao}</Text>
      </ViewFlexColumn>
      <ViewFlexRow>
        <MaterialIcons name="keyboard-arrow-right" size={32} color="blue" />
      </ViewFlexRow>
    </Container>
  );
}

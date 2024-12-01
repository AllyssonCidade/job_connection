import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RouteProps = {
  id?: string;
  cargo?: string;
  descricao?: string;
  data?: string;
  telefone?: string;
  route?: any;
  stats?: string;
};

export type PropsStackRoutes = {
  Home: undefined | RouteProps;
  Login: undefined | RouteProps;
  AtualizarDados: undefined | RouteProps;
  Cadastro: undefined | RouteProps;
  RecuperarSenha: undefined | RouteProps;
  PoliticaDePrivacidade: undefined | RouteProps;
  Sobre: undefined | RouteProps;
  Settings: undefined | RouteProps;
};

export type PropsScreensApp = NativeStackScreenProps<PropsStackRoutes>;

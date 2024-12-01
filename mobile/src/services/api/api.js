import axios from "axios";

export const vagasApi = axios.create({
  baseURL: "http://192.168.1.6:3000/vagas",
});

export const userApi = axios.create({
  baseURL: "http://192.168.1.6:3000/users",
});

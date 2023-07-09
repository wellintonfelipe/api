import axios from "axios";

export const api = axios.create({
  baseURL: "Localhost:3333",
});

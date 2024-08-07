import axios from "axios";

export const planificaTechApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
});
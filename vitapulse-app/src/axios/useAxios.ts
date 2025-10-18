import axios from "axios";

export const useAxios = axios.create({
  baseURL: import.meta.env.VITE_DOMAIN_NAME,
  withCredentials: true,
});

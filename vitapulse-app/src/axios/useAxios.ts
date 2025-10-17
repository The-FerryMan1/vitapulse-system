import axios from "axios";

export const useAxios = axios.create({
  baseURL: import.meta.env.VITE_PRODUCTION === 'dev'? import.meta.env.VITE_DOMAIN_NAME:import.meta.env.VITE_DOCKER_DOMAIN,

  // productions
  // baseURL: 'https://vitapulse-api.onrender.com/api/',
  withCredentials: true,
});

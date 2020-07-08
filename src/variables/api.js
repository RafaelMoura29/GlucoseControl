import axios from "axios";

const api = axios.create({ baseURL: process.env.REACT_APP_API });

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("TOKEN");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

api.interceptors.response.use(undefined, (error) => {
  if (!error.response.data.auth) {
    if (
      !(window.location.pathname === "/authentication/recoverPassword") &&
      !(window.location.pathname === "/authentication/login")
    ) {
      localStorage.removeItem("TOKEN");
      window.location.href = "/";
    }
  }
});

export default api;

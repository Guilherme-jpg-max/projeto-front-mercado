import axios, { AxiosError } from "axios";
import type { AxiosInstance } from "axios";
// @ts-expect-error - Vite env types não configurados
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
// Criar instância do axios
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error: string }>) => {
    // Erro de rede
    if (!error.response) {
      console.error("Erro de conexão com o servidor");
      return Promise.reject(new Error("Erro de conexão com o servidor"));
    }

    const { status } = error.response;

    switch (status) {
      case 401:
        // Não autenticado - redirecionar para login
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        break;

      case 403:
        console.error("Acesso negado");
        break;

      case 404:
        console.error("Recurso não encontrado");
        break;

      case 400:
        break;

      case 500:
        console.error("Erro interno do servidor");
        break;
    }

    return Promise.reject(error);
  }
);

export default api;

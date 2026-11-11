import axios from 'axios';

// Creamos la instancia leyendo la variable de entorno de Vite
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;


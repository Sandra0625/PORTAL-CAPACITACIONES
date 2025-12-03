// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api' // Ajusta si tu backend corre en otro puerto
});

// Adjuntar token automáticamente si existe en localStorage
api.interceptors.request.use(config => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // En entornos no-browser localStorage puede fallar; ignorar
  }
  return config;
});

export default api;

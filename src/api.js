// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api' // Ajusta si tu backend corre en otro puerto
});

export default api;

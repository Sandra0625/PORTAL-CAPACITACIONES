// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api' // Ajusta si tu backend corre en otro puerto
});

export default api;

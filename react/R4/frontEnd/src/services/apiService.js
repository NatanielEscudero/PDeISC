import axios from "axios";

// URL temporal con proxy CORS para testing
const API_BASE = "https://p-de-isc-back.vercel.app/api";

// Configuración global de axios
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // Proyectos
  projects: {
    getAll: () => axios.get(`${API_BASE}/projects`),
    getById: (id) => axios.get(`${API_BASE}/projects/${id}`),
    create: (project) => axios.post(`${API_BASE}/projects`, project),
    update: (id, project) => axios.put(`${API_BASE}/projects/${id}`, project),
    delete: (id) => axios.delete(`${API_BASE}/projects/${id}`),
  },

  // Componentes/Íconos
  components: {
    getAll: () => axios.get(`${API_BASE}/components`),
    getByType: (type) => axios.get(`${API_BASE}/components/type/${type}`),
    create: (component) => axios.post(`${API_BASE}/components`, component),
    update: (id, component) => axios.put(`${API_BASE}/components/${id}`, component),
    delete: (id) => axios.delete(`${API_BASE}/components/${id}`),
  },

  // Auth
  auth: {
    login: (credentials) => axios.post(`${API_BASE}/auth/login`, credentials),
  },
};
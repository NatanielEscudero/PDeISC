// src/services/apiService.js
import axios from "axios";
import config from "../config";

const API_BASE = config.API_BASE;

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// ========== VERIFICACIÓN DE BACKEND ==========
let backendOnline = false;

export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();
    console.log('✅ Backend funcionando:', data);
    backendOnline = true;
    return true;
  } catch (error) {
    console.log('❌ Backend caído, usando datos mock');
    backendOnline = false;
    return false;
  }
};

// Verificar backend al cargar
checkBackendHealth();

// ========== DATOS MOCK TEMPORALES (solo como fallback) ==========
const mockProjects = [
  // ... (tus datos mock actuales se mantienen igual)
];

const mockComponents = [
  // ... (tus datos mock actuales se mantienen igual)
];

// Simular delay de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ========== SERVICIO REAL + FALLBACK MOCK ==========
export const apiService = {
  projects: {
    getAll: async () => {
      if (backendOnline) {
        try {
          const response = await api.get("/projects");
          return response;
        } catch (error) {
          console.warn("Error conectando al backend, usando datos mock");
          backendOnline = false;
        }
      }
      await delay(500);
      return { data: mockProjects };
    },

    getById: async (id) => {
      if (backendOnline) {
        try {
          const response = await api.get(`/projects/${id}`);
          return response;
        } catch (error) {
          console.warn("Error conectando al backend, usando datos mock");
          backendOnline = false;
        }
      }
      await delay(300);
      const project = mockProjects.find(p => p._id === id);
      return { data: project };
    },

    create: async (project) => {
      if (backendOnline) {
        try {
          const response = await api.post("/projects", project);
          return response;
        } catch (error) {
          console.warn("Error conectando al backend, usando datos mock");
          backendOnline = false;
        }
      }
      await delay(400);
      const newProject = {
        ...project,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockProjects.push(newProject);
      return { data: newProject };
    },

    update: async (id, project) => {
      if (backendOnline) {
        try {
          const response = await api.put(`/projects/${id}`, project);
          return response;
        } catch (error) {
          console.warn("Error conectando al backend, usando datos mock");
          backendOnline = false;
        }
      }
      await delay(400);
      const index = mockProjects.findIndex(p => p._id === id);
      if (index !== -1) {
        mockProjects[index] = { 
          ...project, 
          _id: id,
          updatedAt: new Date().toISOString()
        };
      }
      return { data: mockProjects[index] };
    },

    delete: async (id) => {
      if (backendOnline) {
        try {
          const response = await api.delete(`/projects/${id}`);
          return response;
        } catch (error) {
          console.warn("Error conectando al backend, usando datos mock");
          backendOnline = false;
        }
      }
      await delay(300);
      const index = mockProjects.findIndex(p => p._id === id);
      if (index !== -1) {
        mockProjects.splice(index, 1);
      }
      return { data: { message: "Proyecto eliminado", id } };
    }
  },

  // En src/services/apiService.js, añade esto al objeto apiService:

desktopIcons: {
  getAll: async () => {
    if (backendOnline) {
      try {
        const response = await api.get("/desktop-icons");
        return response;
      } catch (error) {
        console.warn("Error obteniendo íconos, usando datos mock");
        backendOnline = false;
      }
    }
    await delay(300);
    // Datos mock de íconos por defecto
    const mockIcons = [
      {
        _id: "1",
        title: "Sobre Mí",
        type: "about",
        icon: "/icons/about.png",
        position: { x: 0, y: 0 },
        order: 1,
        isVisible: true,
        windowConfig: { width: 500, height: 400 }
      },
      {
        _id: "2",
        title: "Proyectos",
        type: "projects", 
        icon: "/icons/projects.png",
        position: { x: 0, y: 1 },
        order: 2,
        isVisible: true,
        windowConfig: { width: 600, height: 500 }
      },
      {
        _id: "3", 
        title: "Skills",
        type: "skills",
        icon: "/icons/skills.png",
        position: { x: 0, y: 2 },
        order: 3,
        isVisible: true,
        windowConfig: { width: 500, height: 400 }
      },
      {
        _id: "4",
        title: "Contacto",
        type: "contact",
        icon: "/icons/contact.png", 
        position: { x: 0, y: 3 },
        order: 4,
        isVisible: true,
        windowConfig: { width: 450, height: 500 }
      }
    ];
    return { data: mockIcons };
  },

  updatePosition: async (id, position) => {
    if (backendOnline) {
      try {
        const response = await api.put(`/desktop-icons/${id}`, { position });
        return response;
      } catch (error) {
        console.warn("Error actualizando posición, usando datos locales");
      }
    }
    await delay(200);
    return { data: { message: "Posición actualizada localmente", id, position } };
  }
},

  components: {
    getAll: async () => {
      if (backendOnline) {
        try {
          const response = await api.get("/components");
          return response;
        } catch (error) {
          console.warn("Error conectando al backend, usando datos mock");
          backendOnline = false;
        }
      }
      await delay(500);
      return { data: mockComponents };
    },

    getByType: async (type) => {
      if (backendOnline) {
        try {
          const response = await api.get(`/components/type/${type}`);
          return response;
        } catch (error) {
          console.warn("Error conectando al backend, usando datos mock");
          backendOnline = false;
        }
      }
      await delay(300);
      const component = mockComponents.find(c => c.type === type && c.isActive);
      return { data: component };
    },

    create: async (component) => {
      if (backendOnline) {
        try {
          const response = await api.post("/components", component);
          return response;
        } catch (error) {
          console.warn("Error conectando al backend, usando datos mock");
          backendOnline = false;
        }
      }
      await delay(400);
      const newComponent = {
        ...component,
        _id: Date.now().toString(),
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockComponents.push(newComponent);
      return { data: newComponent };
    },

    update: async (id, component) => {
      if (backendOnline) {
        try {
          const response = await api.put(`/components/${id}`, component);
          return response;
        } catch (error) {
          console.warn("Error conectando al backend, usando datos mock");
          backendOnline = false;
        }
      }
      await delay(400);
      const index = mockComponents.findIndex(c => c._id === id);
      if (index !== -1) {
        mockComponents[index] = { 
          ...component, 
          _id: id,
          updatedAt: new Date().toISOString()
        };
      }
      return { data: mockComponents[index] };
    },

    delete: async (id) => {
      if (backendOnline) {
        try {
          const response = await api.delete(`/components/${id}`);
          return response;
        } catch (error) {
          console.warn("Error conectando al backend, usando datos mock");
          backendOnline = false;
        }
      }
      await delay(300);
      const index = mockComponents.findIndex(c => c._id === id);
      if (index !== -1) {
        mockComponents.splice(index, 1);
      }
      return { data: { message: "Componente eliminado", id } };
    }
  },

  auth: {
    login: async (credentials) => {
      if (backendOnline) {
        try {
          const response = await api.post("/auth/login", credentials);
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
          }
          return response;
        } catch (error) {
          console.warn("Error conectando al backend, usando autenticación mock");
          backendOnline = false;
        }
      }
      
      await delay(800);
      
      // Credenciales mock - siempre funciona
      if (credentials.username && credentials.password) {
        const token = "mock-jwt-token-" + Date.now();
        localStorage.setItem("token", token);
        
        return { 
          data: { 
            token: token,
            user: { username: credentials.username }
          } 
        };
      }
      
      throw new Error("Credenciales incorrectas");
    }
  },

  // Función para forzar verificación del backend
  checkBackend: () => checkBackendHealth(),
  
  // Función para ver estado actual
  isBackendOnline: () => backendOnline
};
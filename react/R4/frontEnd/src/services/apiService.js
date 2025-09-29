// src/services/apiService.js
import axios from "axios";

// ========== DATOS MOCK TEMPORALES ==========
const mockProjects = [
  {
    _id: "1",
    title: "Portfolio Web Interactivo",
    description: "Sistema operativo virtual construido con React y Node.js que simula un escritorio con ventanas arrastrables.",
    technologies: "React, Node.js, Express, MongoDB, CSS3",
    githubUrl: "https://github.com/NatanielEscudero/PDeISC",
    demoUrl: "https://p-de-isc.vercel.app",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
    category: "web",
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: "2", 
    title: "API REST Avanzada",
    description: "Backend escalable con autenticación JWT, gestión de proyectos y componentes dinámicos.",
    technologies: "Node.js, Express, MongoDB, JWT, CORS",
    githubUrl: "https://github.com/NatanielEscudero/PDeISC",
    demoUrl: "https://p-de-isc-back.vercel.app",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    category: "web",
    featured: true,
    createdAt: new Date().toISOString()
  }
];

const mockComponents = [
  {
    _id: "1",
    type: "about",
    title: "Sobre Mí",
    content: `
      <div style="padding: 1rem;">
        <h3>¡Hola! Soy Nataniel</h3>
        <p>Desarrollador full-stack con experiencia en React, Node.js y MongoDB.</p>
        <p>Este proyecto simula un sistema operativo completo en el navegador.</p>
        <ul>
          <li>🚀 Ventanas arrastrables y redimensionables</li>
          <li>🎯 Sistema de autenticación</li>
          <li>📁 Gestión dinámica de proyectos</li>
          <li>🎨 Interfaz tipo Windows</li>
        </ul>
      </div>
    `,
    icon: "/icons/about.png",
    isActive: true,
    order: 1,
    windowConfig: {
      width: 500,
      height: 400,
      position: { x: 200, y: 150 }
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "2",
    type: "skills",
    title: "Mis Skills",
    content: `
      <div style="padding: 1rem;">
        <h3>Tecnologías que domino:</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
          <div style="background: rgba(255,255,255,0.1); padding: 0.5rem; border-radius: 4px;">
            <strong>Frontend</strong>
            <p>React, JavaScript, CSS3, HTML5</p>
          </div>
          <div style="background: rgba(255,255,255,0.1); padding: 0.5rem; border-radius: 4px;">
            <strong>Backend</strong>
            <p>Node.js, Express, MongoDB</p>
          </div>
          <div style="background: rgba(255,255,255,0.1); padding: 0.5rem; border-radius: 4px;">
            <strong>Herramientas</strong>
            <p>Git, Vercel, Postman</p>
          </div>
          <div style="background: rgba(255,255,255,0.1); padding: 0.5rem; border-radius: 4px;">
            <strong>En aprendizaje</strong>
            <p>TypeScript, Python, AWS</p>
          </div>
        </div>
      </div>
    `,
    icon: "/icons/skills.png", 
    isActive: true,
    order: 2,
    windowConfig: {
      width: 500,
      height: 400,
      position: { x: 300, y: 200 }
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "3",
    type: "contact",
    title: "Contacto",
    content: `
      <div style="padding: 1rem;">
        <h3>¡Hablemos!</h3>
        <p>Puedes contactarme a través de:</p>
        <div style="margin-top: 1rem;">
          <p>📧 Email: nataniel@ejemplo.com</p>
          <p>💼 LinkedIn: linkedin.com/in/nataniel</p>
          <p>🐙 GitHub: github.com/NatanielEscudero</p>
        </div>
        <form style="margin-top: 1.5rem;">
          <input type="text" placeholder="Tu nombre" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; color: white;">
          <input type="email" placeholder="Tu email" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; color: white;">
          <textarea placeholder="Tu mensaje" rows="4" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; color: white;"></textarea>
          <button type="submit" style="background: #4CAF50; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Enviar mensaje</button>
        </form>
      </div>
    `,
    icon: "/icons/contact.png",
    isActive: true, 
    order: 3,
    windowConfig: {
      width: 450,
      height: 500,
      position: { x: 400, y: 100 }
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Simular delay de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ========== SERVICIO MOCK ==========
export const apiService = {
  projects: {
    getAll: async () => {
      await delay(500);
      return { data: mockProjects };
    },
    getById: async (id) => {
      await delay(300);
      const project = mockProjects.find(p => p._id === id);
      return { data: project };
    },
    create: async (project) => {
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
      await delay(300);
      const index = mockProjects.findIndex(p => p._id === id);
      if (index !== -1) {
        mockProjects.splice(index, 1);
      }
      return { data: { message: "Proyecto eliminado", id } };
    }
  },

  components: {
    getAll: async () => {
      await delay(500);
      return { data: mockComponents };
    },
    getByType: async (type) => {
      await delay(300);
      const component = mockComponents.find(c => c.type === type && c.isActive);
      return { data: component };
    },
    create: async (component) => {
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
  }
};

// ========== FUNCIÓN PARA VERIFICAR BACKEND ==========
export const checkBackendHealth = async () => {
  try {
    const response = await fetch('https://p-de-isc-back.vercel.app/api/health');
    const data = await response.json();
    console.log('✅ Backend funcionando:', data);
    return true;
  } catch (error) {
    console.log('❌ Backend caído, usando datos mock');
    return false;
  }
};
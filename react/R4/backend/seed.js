import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/project.js";

dotenv.config();

// Datos iniciales mejorados
const projects = [
  {
    title: "Portfolio Web Interactivo",
    description: "Sistema operativo virtual construido con React y Node.js que simula un escritorio con ventanas arrastrables y sistema de archivos.",
    technologies: "React, Node.js, Express, MongoDB, CSS3",
    githubUrl: "https://github.com/tuusuario/portfolio",
    demoUrl: "https://tuportfolio.com",
    image: "https://via.placeholder.com/400x250/4A90E2/FFFFFF?text=Portfolio+Web",
    category: "web",
    featured: true
  },
  {
    title: "API REST Avanzada",
    description: "Backend escalable con autenticación JWT, upload de archivos, y documentación automática con Swagger.",
    technologies: "Node.js, Express, MongoDB, JWT, Swagger",
    githubUrl: "https://github.com/tuusuario/api-rest",
    demoUrl: "https://api.tuapp.com/docs",
    image: "https://via.placeholder.com/400x250/50E3C2/FFFFFF?text=API+REST",
    category: "web",
    featured: true
  },
  {
    title: "Dashboard en Tiempo Real",
    description: "Aplicación de monitoreo en tiempo real con gráficos interactivos, notificaciones y modo oscuro.",
    technologies: "React, Socket.io, Chart.js, Material-UI",
    githubUrl: "https://github.com/tuusuario/dashboard",
    demoUrl: "https://dashboard.tuapp.com",
    image: "https://via.placeholder.com/400x250/9013FE/FFFFFF?text=Dashboard",
    category: "web",
    featured: false
  }
];

// Conectar y poblar DB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Conectado a MongoDB");

    // Limpia la colección para evitar duplicados
    await Project.deleteMany({});
    console.log("🧹 Colección de proyectos limpia");

    // Inserta proyectos con orden
    const projectsWithOrder = projects.map((project, index) => ({
      ...project,
      order: index
    }));
    
    await Project.insertMany(projectsWithOrder);
    console.log("🎉 Proyectos de ejemplo insertados correctamente");

    process.exit();
  })
  .catch(err => {
    console.error("❌ Error en conexión:", err);
    process.exit(1);
  });
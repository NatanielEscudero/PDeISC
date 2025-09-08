import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/project.js";

dotenv.config();

// Datos iniciales
const projects = [
  {
    title: "Portfolio Web",
    description: "Sitio web personal hecho con React, Tailwind y Express.",
    link: "https://miportfolio.com",
    image: "https://via.placeholder.com/400x200.png?text=Portfolio"
  },
  {
    title: "API REST con Node.js",
    description: "API para gestión de usuarios y productos con Express y MongoDB.",
    link: "https://github.com/usuario/api-rest",
    image: "https://via.placeholder.com/400x200.png?text=API+REST"
  },
  {
    title: "Dashboard en React",
    description: "Dashboard interactivo con gráficas y autenticación.",
    link: "https://github.com/usuario/dashboard",
    image: "https://via.placeholder.com/400x200.png?text=Dashboard"
  }
];
}

// ... código existente ...

// Datos iniciales de componentes
const initialComponents = [
  {
    type: "hero",
    title: "Hero Section",
    content: "Bienvenido a mi portfolio",
    icon: "🌟",
    isActive: true,
    order: 0
  },
  {
    type: "about",
    title: "Sobre Mí",
    content: "Información sobre mi experiencia y habilidades",
    icon: "👤",
    isActive: true,
    order: 1
  },
  {
    type: "projects",
    title: "Proyectos",
    content: "Mis proyectos destacados",
    icon: "💼",
    isActive: true,
    order: 2
  },
  {
    type: "contact",
    title: "Contacto",
    content: "Formulario de contacto",
    icon: "📞",
    isActive: true,
    order: 3
  }
];

// En la función de seeding, agregar:
await Component.deleteMany({});
await Component.insertMany(initialComponents);
console.log("🎉 Componentes iniciales insertados");
// Conectar y poblar DB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Conectado a MongoDB");

    // Limpia la colección para evitar duplicados
    await Project.deleteMany({});
    console.log("🧹 Colección limpia");

    // Inserta proyectos
    await Project.insertMany(projects);
    console.log("🎉 Datos insertados correctamente");

    process.exit(); // Finaliza
  })
  .catch(err => {
    console.error("❌ Error en conexión:", err);
    process.exit(1);
  });


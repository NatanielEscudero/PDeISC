import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Configuración CORS específica para tu frontend
app.use(cors({
  origin: [
    "https://p-de-isc.vercel.app", // Tu frontend en producción
    "http://localhost:3000"        // Desarrollo local
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Middleware para manejar preflight requests
app.options('*', cors());

app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error MongoDB:", err));

// Importar rutas
import projectsRouter from "./routes/projects.js";
import componentsRouter from "./routes/components.js";
import authRouter from "./routes/authRoutes.js";

// Usar rutas
app.use("/api/projects", projectsRouter);
app.use("/api/components", componentsRouter);
app.use("/api/auth", authRouter);

// Ruta de salud
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Servidor funcionando correctamente",
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend funcionando correctamente",
    frontend: "https://p-de-isc.vercel.app",
    endpoints: [
      "/api/projects",
      "/api/components", 
      "/api/auth/login",
      "/api/health"
    ]
  });
});

// Manejo de rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
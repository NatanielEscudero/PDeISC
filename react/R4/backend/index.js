import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
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
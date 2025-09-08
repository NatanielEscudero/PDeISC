import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://tu-frontend.vercel.app"],
  credentials: true
}));
app.use(express.json());

// Conexión a MongoDB
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

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

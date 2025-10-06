// api/index.js - ACTUALIZA LA CONFIGURACIÓN CORS
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS config MEJORADO
app.use(cors({
  origin: [
    "https://p-de-isc.vercel.app",
    "https://p-de-isc-git-main-nataniel-escuderos-projects.vercel.app", 
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}));

// Manejar preflight requests
app.options('*', cors());

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => {
    console.error("❌ Error MongoDB:", err);
    process.exit(1);
  });

// Import routes
import projectsRouter from "../routes/projects.js";
import componentsRouter from "../routes/components.js";
import authRouter from "../routes/authRoutes.js";

// Use routes
app.use("/api/projects", projectsRouter);
app.use("/api/components", componentsRouter);
app.use("/api/auth", authRouter);

// Health check MEJORADO
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Backend funcionando",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend PDeISC funcionando",
    version: "1.0.0",
    endpoints: [
      "/api/health",
      "/api/projects", 
      "/api/components",
      "/api/auth/login"
    ]
  });
});

// 404 handler
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "Endpoint no encontrado" });
});

// Error handling MEJORADO
app.use((err, req, res, next) => {
  console.error("💥 Error del servidor:", err);
  res.status(500).json({ 
    error: "Error interno del servidor",
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
  });
});


export default app;

// api/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS config
app.use(cors({
  origin: [
    "https://p-de-isc.vercel.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => {
    console.error("❌ Error MongoDB:", err);
    process.exit(1);
  });

// Import routes with correct paths
import projectsRouter from "../routes/projects.js";
import componentsRouter from "../routes/components.js";
import authRouter from "../routes/authRoutes.js";

// Use routes
app.use("/api/projects", projectsRouter);
app.use("/api/components", componentsRouter);
app.use("/api/auth", authRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Backend funcionando",
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend PDeISC funcionando",
    version: "1.0.0"
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salió mal!" });
});

// Export for Vercel
export default app;
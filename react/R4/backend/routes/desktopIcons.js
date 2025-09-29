// routes/desktopIcons.js
import express from "express";
import DesktopIcon from "../models/desktopIcon.js";

const router = express.Router();

// GET /api/desktop-icons - Obtener todos los íconos
router.get("/", async (req, res) => {
  try {
    const icons = await DesktopIcon.find({ isVisible: true }).sort({ order: 1 });
    res.json(icons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/desktop-icons - Crear nuevo ícono
router.post("/", async (req, res) => {
  try {
    const newIcon = new DesktopIcon(req.body);
    await newIcon.save();
    res.status(201).json(newIcon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/desktop-icons/:id - Actualizar ícono
router.put("/:id", async (req, res) => {
  try {
    const updatedIcon = await DesktopIcon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedIcon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/desktop-icons/:id - Eliminar ícono
router.delete("/:id", async (req, res) => {
  try {
    await DesktopIcon.findByIdAndDelete(req.params.id);
    res.json({ message: "Ícono eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
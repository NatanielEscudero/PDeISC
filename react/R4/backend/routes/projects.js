import express from "express";
import Project from "../models/project.js";

const router = express.Router();

// GET /api/projects - Obtener todos los proyectos
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/projects/:id - Obtener un proyecto por ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/projects - Crear nuevo proyecto
router.post("/", async (req, res) => {
  try {
    // Calcular el orden automáticamente
    const lastProject = await Project.findOne().sort({ order: -1 });
    const newOrder = lastProject ? lastProject.order + 1 : 0;
    
    const newProject = new Project({
      ...req.body,
      order: newOrder
    });
    
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/projects/:id - Actualizar proyecto
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedProject) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/projects/:id - Eliminar proyecto
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    
    if (!deletedProject) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    
    res.json({ 
      message: "Proyecto eliminado correctamente",
      deletedProject 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/projects/:id/reorder - Reordenar proyectos
router.put("/:id/reorder", async (req, res) => {
  try {
    const { newOrder } = req.body;
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    
    // Reordenar lógica
    if (newOrder < project.order) {
      await Project.updateMany(
        { order: { $gte: newOrder, $lt: project.order } },
        { $inc: { order: 1 } }
      );
    } else {
      await Project.updateMany(
        { order: { $gt: project.order, $lte: newOrder } },
        { $inc: { order: -1 } }
      );
    }
    
    project.order = newOrder;
    await project.save();
    
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
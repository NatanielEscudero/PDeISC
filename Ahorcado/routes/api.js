const express = require("express");
const router = express.Router();
const { insertScore, getScores } = require("../models/scoreModel");
const PDFDocument = require("pdfkit");

// Ruta para obtener una palabra
router.get("/palabra", (req, res) => {
    const palabras = ["javascript", "nodejs", "express", "mysql"];
    const palabra = palabras[Math.floor(Math.random() * palabras.length)];
    res.json({ palabra });
});

// Guardar score
router.post("/score", (req, res) => {
    const { nombre, tiempo, puntos } = req.body;
    insertScore(nombre, tiempo, puntos, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Score guardado");
    });
});

// Obtener scores
router.get("/scores", (req, res) => {
    getScores((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Generar PDF
router.get("/pdf", (req, res) => {
    const { nombre, tiempo, puntos } = req.query;

    const doc = new PDFDocument();
    res.setHeader("Content-disposition", "attachment; filename=score.pdf");
    res.setHeader("Content-type", "application/pdf");
    doc.pipe(res);

    doc.fontSize(25).text("Score del Jugador", { align: "center" });
    doc.moveDown();
    doc.text(`Nombre: ${nombre}`);
    doc.text(`Tiempo: ${tiempo} segundos`);
    doc.text(`Puntos: ${puntos}`);

    doc.end();
});

module.exports = router;


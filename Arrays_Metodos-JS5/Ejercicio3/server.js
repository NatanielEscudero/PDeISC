const express = require("express");
const path = require("path");
const app = express();
const colores = [];
const tareas = [];
const usuariosConectados = [];
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { colores, tareas, usuariosConectados });
});
 
app.post("/agregar-colores", (req, res) => {
    colores.unshift("rojo", "verde", "azul");
    res.json({ 
        success: true,
        message: "Colores agregados al principio",
        colores
    });
});

app.post("/agregar-tarea", (req, res) => {
    const { tarea } = req.body;
    if (tarea && tarea.trim() !== '') {
        tareas.unshift(tarea.trim() + " (URGENTE)");
        res.json({ 
            success: true,
            message: "Tarea urgente agregada",
            tareas
        });
    } else {
        res.json({ 
            success: false,
            message: "La tarea no puede estar vacía"
        });
    }
});

app.post("/agregar-usuario", (req, res) => {
    const { usuario } = req.body;
    if (usuario && usuario.trim() !== '') {
        usuariosConectados.unshift(usuario.trim());
        res.json({ 
            success: true,
            message: "Usuario agregado al principio",
            usuariosConectados
        });
    } else {
        res.json({ 
            success: false,
            message: "El nombre de usuario no puede estar vacío"
        });
    }
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
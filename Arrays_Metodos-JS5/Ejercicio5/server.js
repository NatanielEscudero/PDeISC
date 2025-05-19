const express = require("express");
const path = require("path");
const app = express();

const letras = ['a', 'b', 'c', 'd', 'e', 'f'];
const nombres = ['Ana', 'Carlos', 'Diana', 'Eduardo'];
const elementos = ['Agua', 'Tierra', 'Fuego', 'Aire', 'Éter'];

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { letras, nombres, elementos });
});

app.post("/eliminar-letras", (req, res) => {
    const eliminados = letras.splice(1, 2);
    res.json({
        success: true,
        message: `Eliminados: ${eliminados.join(', ')}`,
        letras
    });
});

app.post("/insertar-nombre", (req, res) => {
    const { nombre } = req.body;
    if (!nombre || nombre.trim() === '') {
        return res.json({ success: false, message: "Nombre no puede estar vacío" });
    }
    
    nombres.splice(1, 0, nombre.trim());
    res.json({
        success: true,
        message: `Nombre insertado en posición 2`,
        nombres
    });
});

app.post("/reemplazar-elementos", (req, res) => {
    const { posicion, nuevo1, nuevo2 } = req.body;
    const pos = parseInt(posicion);
    
    if (isNaN(pos) || pos < 0 || pos >= elementos.length - 1) {
        return res.json({ success: false, message: "Posición inválida" });
    }
    
    const eliminados = elementos.splice(pos, 2, nuevo1.trim(), nuevo2.trim());
    res.json({
        success: true,
        message: `Reemplazados: ${eliminados.join(', ')}`,
        elementos
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
const express = require("express");
const path = require("path");
const app = express();
 
const numeros = [5, 12, 8, 15, 3, 20, 9, 11];
const palabras = ["casa", "ordenador", "sol", "montaña", "libro", "electrodoméstico"];
const usuarios = [
    { nombre: "Ana", activo: true },
    { nombre: "Carlos", activo: false },
    { nombre: "María", activo: true },
    { nombre: "Juan", activo: false },
    { nombre: "Lucía", activo: true }
];

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { 
        numeros: [...numeros],
        palabras: [...palabras],
        usuarios: [...usuarios]
    });
});
 
app.post("/filtrar-numeros", (req, res) => {
    const numerosFiltrados = numeros.filter(numero => numero > 10);
    res.json({
        success: true,
        message: "Números mayores a 10",
        original: [...numeros],
        resultado: numerosFiltrados
    });
});
 
app.post("/filtrar-palabras", (req, res) => {
    const palabrasFiltradas = palabras.filter(palabra => palabra.length > 5);
    res.json({
        success: true,
        message: "Palabras con más de 5 letras",
        original: [...palabras],
        resultado: palabrasFiltradas
    });
});
 
app.post("/filtrar-usuarios", (req, res) => {
    const usuariosActivos = usuarios.filter(usuario => usuario.activo);
    res.json({
        success: true,
        message: "Usuarios activos",
        original: [...usuarios],
        resultado: usuariosActivos
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
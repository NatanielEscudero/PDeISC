const express = require("express");
const path = require("path");
const app = express();

const letras = ['a', 'b', 'c', 'd', 'e'];
const numeros = [1, 2, 3, 4, 5];
const texto = "Hola mundo";

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { 
        letras: [...letras],
        numeros: [...numeros],
        texto: texto
    });
});

app.post("/invertir-letras", (req, res) => {
    const letrasInvertidas = [...letras].reverse();
    res.json({
        success: true,
        message: "Array de letras invertido",
        original: [...letras],
        resultado: letrasInvertidas
    });
});

app.post("/invertir-numeros", (req, res) => {
    const numerosInvertidos = [...numeros].reverse();
    res.json({
        success: true,
        message: "Array de números invertido",
        original: [...numeros],
        resultado: numerosInvertidos
    });
});

app.post("/invertir-texto", (req, res) => {
    const textoInvertido = [...texto].reverse().join('');
    res.json({
        success: true,
        message: "Texto invertido",
        original: texto,
        resultado: textoInvertido
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
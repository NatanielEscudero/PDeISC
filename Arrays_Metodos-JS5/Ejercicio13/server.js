const express = require("express");
const path = require("path");
const app = express();
 
const numeros = [34, 7, 23, 32, 5, 62];
const palabras = ["perro", "gato", "elefante", "ardilla", "ballena"];
const personas = [
    { nombre: "Ana", edad: 25 },
    { nombre: "Carlos", edad: 30 },
    { nombre: "María", edad: 22 },
    { nombre: "Juan", edad: 28 },
    { nombre: "Lucía", edad: 19 }
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
        personas: [...personas]
    });
}); 

app.post("/ordenar-numeros", (req, res) => {
    const numerosOrdenados = [...numeros].sort((a, b) => a - b);
    res.json({
        success: true,
        message: "Números ordenados de menor a mayor",
        original: [...numeros],
        resultado: numerosOrdenados
    });
});
 
app.post("/ordenar-palabras", (req, res) => {
    const palabrasOrdenadas = [...palabras].sort();
    res.json({
        success: true,
        message: "Palabras ordenadas alfabéticamente",
        original: [...palabras],
        resultado: palabrasOrdenadas
    });
});
 
app.post("/ordenar-personas", (req, res) => {
    const personasOrdenadas = [...personas].sort((a, b) => a.edad - b.edad);
    res.json({
        success: true,
        message: "Personas ordenadas por edad",
        original: [...personas],
        resultado: personasOrdenadas
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
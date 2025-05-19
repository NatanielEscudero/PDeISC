const express = require("express");
const path = require("path");
const app = express();
 
const nombres = ["Ana", "Carlos", "María", "Juan"];
const numeros = [5, 10, 15, 20];
const personas = [
    { nombre: "Ana", edad: 25 },
    { nombre: "Carlos", edad: 30 },
    { nombre: "María", edad: 22 },
    { nombre: "Juan", edad: 28 }
];

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { 
        nombres: [...nombres],
        numeros: [...numeros],
        personas: [...personas]
    });
});
 
app.post("/saludar-nombres", (req, res) => {
    const saludos = [];
    nombres.forEach(nombre => {
        saludos.push(`¡Hola, ${nombre}!`);
    });
    
    res.json({
        success: true,
        message: "Saludos generados",
        resultado: saludos
    });
});
 
app.post("/calcular-dobles", (req, res) => {
    const dobles = [];
    numeros.forEach(numero => {
        dobles.push(numero*2);
    });
    
    res.json({
        success: true,
        message: "Dobles calculados",
        resultado: dobles
    });
});
 
app.post("/mostrar-personas", (req, res) => {
    const infoPersonas = [];
    personas.forEach(persona => {
        infoPersonas.push(`${persona.nombre} tiene ${persona.edad} años`);
    });
    
    res.json({
        success: true,
        message: "Información de personas generada",
        resultado: infoPersonas
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
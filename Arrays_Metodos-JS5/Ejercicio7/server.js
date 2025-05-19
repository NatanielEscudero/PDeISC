const express = require("express");
const path = require("path");
const app = express();
 
const animales = ["gato", "perro", "conejo", "hamster", "perro", "loro"];
const numeros = [10, 20, 30, 40, 50, 60];
const ciudades = ["Barcelona", "Valencia", "Sevilla", "Madrid", "Bilbao"];

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { 
        animales: [...animales],
        numeros: [...numeros],
        ciudades: [...ciudades]
    });
});
 
app.post("/buscar-perro", (req, res) => {
    const posicion = animales.indexOf("perro");
    const mensaje = posicion !== -1 
        ? `La palabra "perro" está en la posición ${posicion}`
        : `La palabra "perro" no se encontró en el array`;
    
    res.json({
        success: true,
        message: mensaje,
        posicion: posicion
    });
});
 
app.post("/buscar-numero", (req, res) => {
    const posicion = numeros.indexOf(50);
    const mensaje = posicion !== -1 
        ? `El número 50 está en la posición ${posicion}`
        : `El número 50 no se encontró en el array`;
    
    res.json({
        success: true,
        message: mensaje,
        posicion: posicion
    });
});
 
app.post("/buscar-madrid", (req, res) => {
    const posicion = ciudades.indexOf("Madrid");
    const mensaje = posicion !== -1 
        ? `Madrid está en la posición ${posicion}`
        : `Madrid no se encontró en el array de ciudades`;
    
    res.json({
        success: true,
        message: mensaje,
        posicion: posicion
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
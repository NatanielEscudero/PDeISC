const express = require("express");
const path = require("path");
const app = express();
 
const numeros = [1, 2, 3, 4, 5];
const nombres = ["ana", "carlos", "maría", "juan"];
const precios = [10, 20, 30, 40, 50];

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { 
        numeros: [...numeros],
        nombres: [...nombres],
        precios: [...precios]
    });
});
 
app.post("/multiplicar-numeros", (req, res) => {
    const numerosTriples = numeros.map(numero => numero * 3);
    res.json({
        success: true,
        message: "Números multiplicados por 3",
        original: [...numeros],
        resultado: numerosTriples
    });
});
 
app.post("/convertir-mayusculas", (req, res) => {
    const nombresMayusculas = nombres.map(nombre => nombre.toUpperCase());
    res.json({
        success: true,
        message: "Nombres convertidos a mayúsculas",
        original: [...nombres],
        resultado: nombresMayusculas
    });
});
 
app.post("/agregar-iva", (req, res) => {
    const preciosConIva = precios.map(precio => {
        const iva = precio * 0.21;
        return {
            base: precio,
            iva: parseFloat(iva.toFixed(2)),
            total: parseFloat((precio + iva).toFixed(2))
        };
    });
    
    res.json({
        success: true,
        message: "IVA agregado a precios (21%)",
        original: [...precios],
        resultado: preciosConIva
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
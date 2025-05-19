const express = require("express");
const path = require("path");
const app = express();
 
const numerosSuma = [1, 2, 3, 4, 5];
const numerosMultiplicacion = [2, 3, 4, 5];
const productos = [
    { nombre: "Camisa", precio: 25 },
    { nombre: "Pantalón", precio: 40 },
    { nombre: "Zapatos", precio: 60 },
    { nombre: "Sombrero", precio: 15 }
];

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { 
        numerosSuma: [...numerosSuma],
        numerosMultiplicacion: [...numerosMultiplicacion],
        productos: [...productos]
    });
});
 
app.post("/sumar-numeros", (req, res) => {
    const suma = numerosSuma.reduce((acumulador, numero) => acumulador + numero, 0);
    res.json({
        success: true,
        message: "Suma de números calculada",
        array: [...numerosSuma],
        resultado: suma
    });
});
 
app.post("/multiplicar-numeros", (req, res) => {
    const producto = numerosMultiplicacion.reduce((acumulador, numero) => acumulador * numero, 1);
    res.json({
        success: true,
        message: "Producto de números calculado",
        array: [...numerosMultiplicacion],
        resultado: producto
    });
});
 
app.post("/sumar-precios", (req, res) => {
    const total = productos.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    res.json({
        success: true,
        message: "Total de precios calculado",
        array: [...productos],
        resultado: total
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
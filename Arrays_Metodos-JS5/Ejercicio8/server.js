const express = require("express");
const path = require("path");
const app = express();
 
const usuarios = ["user1", "admin", "user2", "moderator"];
const colores = ["rojo", "azul", "verde", "amarillo"];
const numeros = [10, 20, 30, 40];

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { 
        usuarios: [...usuarios],
        colores: [...colores],
        numeros: [...numeros]
    });
});
 
app.post("/verificar-admin", (req, res) => {
    const existeAdmin = usuarios.includes("admin");
    res.json({
        success: true,
        message: existeAdmin 
            ? 'El array contiene el usuario "admin"' 
            : 'El array NO contiene el usuario "admin"',
        existe: existeAdmin
    });
});
 
app.post("/verificar-verde", (req, res) => {
    const existeVerde = colores.includes("verde");
    res.json({
        success: true,
        message: existeVerde 
            ? 'El array contiene el color "verde"' 
            : 'El array NO contiene el color "verde"',
        existe: existeVerde
    });
});

// 3. Verificar y agregar número
app.post("/agregar-numero", (req, res) => {
    const { numero } = req.body;
    const num = parseInt(numero);
    
    if (isNaN(num)) {
        return res.status(400).json({ 
            success: false, 
            message: "Por favor ingrese un número válido" 
        });
    }

    const existeNumero = numeros.includes(num);
    
    if (existeNumero) {
        return res.json({
            success: true,
            message: `El número ${num} ya existe en el array`,
            numeros: [...numeros],
            agregado: false
        });
    }

    numeros.push(num);
    res.json({
        success: true,
        message: `Número ${num} agregado correctamente`,
        numeros: [...numeros],
        agregado: true
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
const express = require("express");
const path = require("path");
const app = express();
const animales = [];
const compras = [];
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { animales, compras });
});

app.post("/submit", (req, res) => {
    const { animales: nuevosAnimales, compras: nuevasCompras } = req.body;
    
    if (nuevosAnimales && nuevosAnimales.length > 0) {
        nuevosAnimales.forEach(animal => {
            const animalTrim = animal.trim();
            if (animalTrim !== '' && !animales.includes(animalTrim)) {
                animales.push(animalTrim);
            }
        });
    }
    
    if (nuevasCompras && nuevasCompras.length > 0) {
        nuevasCompras.forEach(compra => {
            const compraTrim = compra.trim();
            if (compraTrim !== '' && !compras.includes(compraTrim)) {
                compras.push(compraTrim);
            }
        });
    }
    
    res.json({ animales, compras });
});

app.post("/eliminar-ultimo-animal", (req, res) => {
    if (animales.length > 0) {
        animales.pop();
        res.json({ 
            success: true,
            message: "Último animal eliminado",
            animales
        });
    } else {
        res.json({ 
            success: false,
            message: "No hay animales para eliminar"
        });
    }
});

app.post("/eliminar-ultima-compra", (req, res) => {
    if (compras.length > 0) {
        compras.pop();
        res.json({ 
            success: true,
            message: "Última compra eliminada",
            compras
        });
    } else {
        res.json({ 
            success: false,
            message: "No hay compras para eliminar"
        });
    }
});

app.post("/limpiar-todo", (req, res) => {
    while(animales.length > 0) {
        animales.pop();
    }
    while(compras.length > 0) {
        compras.pop();
    }
    res.json({ 
        success: true,
        message: "Todos los datos han sido eliminados",
        animales,
        compras
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
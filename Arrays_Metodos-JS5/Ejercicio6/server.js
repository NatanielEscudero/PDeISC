const express = require("express");
const path = require("path");
const app = express();
 
const numeros = [10, 20, 30, 40, 50, 60, 70];
const peliculas = [
    "El Padrino", 
    "Pulp Fiction", 
    "El Señor de los Anillos",
    "Titanic",
    "Matrix",
    "Interestelar"
];
const elementos = ["A", "B", "C", "D", "E", "F", "G"];

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { 
        numeros: [...numeros],
        peliculas: [...peliculas],
        elementos: [...elementos]
    });
});
 
app.post("/copiar-primeros-numeros", (req, res) => {
    const primerosTres = numeros.slice(0, 3);
    res.json({
        success: true,
        message: `Primeros 3 números copiados: ${primerosTres.join(', ')}`,
        resultado: primerosTres
    });
});
 
app.post("/copiar-peliculas", (req, res) => {
    const peliculasSeleccionadas = peliculas.slice(2, 5);  
    res.json({
        success: true,
        message: `Películas copiadas (posición 2 a 4): ${peliculasSeleccionadas.join(', ')}`,
        resultado: peliculasSeleccionadas
    });
});
 
app.post("/copiar-ultimos-elementos", (req, res) => {
    const ultimosTres = elementos.slice(-3);
    res.json({
        success: true,
        message: `Últimos 3 elementos copiados: ${ultimosTres.join(', ')}`,
        resultado: ultimosTres
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
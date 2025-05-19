const express = require("express");
const path = require("path");
const app = express();
const personas = [];
const frutas = [];
const numeros = [];
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { personas, frutas, numeros });
});

app.post("/submit", (req, res) => {
    const { personas: nuevasPersonas, frutas: nuevasFrutas, numeros: nuevosNumeros } = req.body;
    
    if (nuevasPersonas && nuevasPersonas.length > 0) {
        nuevasPersonas.forEach(persona => {
            if (persona.trim() !== '' && !personas.includes(persona.trim())) {
                personas.push(persona.trim());
            }
        });
    }
    
    if (nuevasFrutas && nuevasFrutas.length > 0) {
        nuevasFrutas.forEach(fruta => {
            if (fruta.trim() !== '' && !frutas.includes(fruta.trim())) {
                frutas.push(fruta.trim());
            }
        });
    }
    
    if (nuevosNumeros && nuevosNumeros.length > 0) {
        nuevosNumeros.forEach(numero => {
            const num = Number(numero);
            if (!isNaN(num)) {
                const ultimoNumero = numeros.length > 0 ? numeros[numeros.length - 1] : -Infinity;
                if (num > ultimoNumero && !numeros.includes(num)) {
                    numeros.push(num);
                }
            }
        });
    }
    
    res.json({ personas, frutas, numeros });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Listening on 127.0.0.1:${PORT}`);
});
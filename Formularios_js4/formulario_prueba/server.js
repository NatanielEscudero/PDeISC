const express = require("express");
const path = require("path");
const app = express();
const personas = [];
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/submit", (req, res) => {
    const persona = {
        usr: req.body.usr,
        pass: req.body.pass
    };
    personas.push(persona);
    res.send('Persona agregada <a href="/">Volver</a>');
});

app.get("/persona", (req, res) => {
    let lista = '<h1>Listado de personas</h1><ul>';
    personas.forEach(p => {
        lista += `<li>${p.usr} - ${p.pass}</li>`;
    });
    lista += '</ul><a href="/">Volver</a>';
    res.send(lista);
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Listening on 127.0.0.1:${PORT}`);
});

const express = require("express");
const path = require("path");
const app = express();
const personas = [];
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { personas });
});

app.post("/submit", (req, res) => {
    const persona = {
        usr: req.body.usr,
        pass: req.body.pass
    };
    personas.push(persona);  
    res.json(personas);
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Listening on 127.0.0.1:${PORT}`);
});
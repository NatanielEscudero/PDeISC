const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Formulario de Registro',
        formData: null,
        submitted: false
    });
});

app.post('/register', (req, res) => {
    res.render('index', {
        title: 'Datos Registrados',
        formData: req.body,
        submitted: true
    });
});

app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});
const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { title: 'Inicio' });
});

app.get('/component1', (req, res) => {
    res.render('components/component1', { title: 'Componente 1 - Contador' });
});

app.get('/component2', (req, res) => {
    res.render('components/component2', { title: 'Componente 2 - Lista de Tareas' });
});

app.get('/component3', (req, res) => {
    res.render('components/component3', { title: 'Componente 3 - Galería de Imágenes' });
});

app.get('/component4', (req, res) => {
    res.render('components/component4', { title: 'Componente 4 - Formulario de Contacto' });
});

app.get('/component5', (req, res) => {
    res.render('components/component5', { title: 'Componente 5 - Reloj Digital' });
});

app.post('/contact', (req, res) => {
    console.log('Datos del formulario:', req.body);
    res.redirect('/component4?success=true');
});

app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});
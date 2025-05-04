const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Manipulación DOM con innerHTML',
        elements: [
            { name: 'Párrafo', type: 'p' },
            { name: 'Encabezado', type: 'h2' },
            { name: 'Imagen', type: 'img' },
            { name: 'Lista', type: 'ul' },
            { name: 'Tabla', type: 'table' },
            { name: 'Formulario', type: 'form' },
            { name: 'Video', type: 'video' },
            { name: 'Sección', type: 'section' }
        ]
    });
});

app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});
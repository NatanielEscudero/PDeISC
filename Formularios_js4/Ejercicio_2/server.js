const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const productos = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { productos });
});

app.post('/agregar-producto', (req, res) => {
  const nuevoProducto = {
    deporte: req.body.deporte,
    herramienta: req.body.herramienta,
    precio: req.body.precio,
    categoria: req.body.categoria,
    id: Date.now()
  };
  
  productos.push(nuevoProducto);
  res.json({ success: true, productos });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
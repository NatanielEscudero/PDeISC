const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

let personas = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { personas });
});

app.post('/api/personas', (req, res) => {
  const persona = req.body;
  persona.id = Date.now();
  personas.push(persona);
  res.json({ 
    success: true, 
    personas
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
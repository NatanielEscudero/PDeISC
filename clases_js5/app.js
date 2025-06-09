import { CZooAnimal } from './Zoo.js';
import express from 'express';
import bodyParser from 'body-parser';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const zoo = [];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const name = req.body.nombre;
  const type = req.body.tipo;
  const pound = req.body.peso;
  const cage = req.body.jaula;

  const animal = new CZooAnimal(name, cage, type, pound);
  zoo.push(animal);
  console.log(zoo);
  // Redirige a la vista con document.write
  res.render('tabla', { zoo });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
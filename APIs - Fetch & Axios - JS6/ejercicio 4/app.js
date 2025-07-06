const express = require('express');
const app = express();
const PORT = 3004;

const alumnos = [
  { id: 1, nombre: 'Ana', nota: 8 },
  { id: 2, nombre: 'Luis', nota: 7 },
  { id: 3, nombre: 'Marta', nota: 9 }
];

app.use(express.static('public'));

app.get('/api/alumnos', (req, res) => {
  res.json(alumnos);
});

app.listen(PORT, () => {
  console.log(`API en http://localhost:${PORT}`);
});

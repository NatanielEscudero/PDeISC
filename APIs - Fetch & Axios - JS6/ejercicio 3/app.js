const express = require('express');
const app = express();
const PORT = 3003;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

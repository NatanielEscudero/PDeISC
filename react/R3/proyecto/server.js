import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './conexion.js';

const app = express();
app.use(cors());
app.use(express.json());

// Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.execute('SELECT * FROM usr');
    await db.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Obtener un usuario por ID
app.get('/usuarios/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.execute('SELECT * FROM usr WHERE id = ?', [req.params.id]);
    await db.end();
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

// Crear usuario
app.post('/usuarios', async (req, res) => {
  const { Nombre, Apellido, Direccion, Dni, Teléfono, "Fecha de nacimiento": FechaNacimiento, Email } = req.body;
  try {
    const db = await connectToDatabase();
    const [result] = await db.execute(
      'INSERT INTO usr (Nombre, Apellido, Direccion, Dni, Teléfono, `Fecha de nacimiento`, Email) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [Nombre, Apellido, Direccion, Dni, Teléfono, FechaNacimiento, Email]
    );
    await db.end();
    res.json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// Editar usuario
app.put('/usuarios/:id', async (req, res) => {
  const { Nombre, Apellido, Direccion, Dni, Teléfono, "Fecha de nacimiento": FechaNacimiento, Email } = req.body;
  try {
    const db = await connectToDatabase();
    await db.execute(
      'UPDATE usr SET Nombre=?, Apellido=?, Direccion=?, Dni=?, Teléfono=?, `Fecha de nacimiento`=?, Email=? WHERE id=?',
      [Nombre, Apellido, Direccion, Dni, Teléfono, FechaNacimiento, Email, req.params.id]
    );
    await db.end();
    res.json({ message: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// Eliminar usuario
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    await db.execute('DELETE FROM usr WHERE id=?', [req.params.id]);
    await db.end();
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

app.get('/', (req, res) => {
  res.send('API de usuarios funcionando');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
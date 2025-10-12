import { Request, Response } from 'express';
import { db } from '../config/dbConfig';
import { RowDataPacket } from 'mysql2';

export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  
  db.query<RowDataPacket[]>(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
    
    if (results.length > 0) {
      return res.json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
};
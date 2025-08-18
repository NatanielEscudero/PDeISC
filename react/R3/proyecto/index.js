import {connectToDatabase}  from './conexion.js';
const main = async () => {
  const DB = await connectToDatabase();
  if (!DB) {
    return;
  }
  const [rows] = await DB.execute('SELECT * FROM usr');
  console.log('Usuarios:', rows);

}

main();
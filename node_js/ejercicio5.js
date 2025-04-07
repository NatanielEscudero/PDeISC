import { createServer } from 'node:http';
import { division, multiplicacion, resta, suma } from './calculo.js';

const server = createServer((_, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Resultados</title>    
    <style>
    thead, tbody {
      border-collapse: collapse;
      width: 50%;
      margin: 20px auto;
    }
    th, tr, td {
     border: 1px solid #ddd;
     padding: 8px;
     text-align: center;
    }
    </style>

    </head>
    <body>
    <table>
    <thead class="table-primary">
      <tr>
        <th>Operación</th>
        <th>Resultado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>4+5</td>
        <td>${suma(4, 5)}</td>
      </tr>
      <tr>
        <td>3-6</td>
        <td>${resta(3, 6)}</td>
      </tr>
      <tr>
        <td>2*7</td>
        <td>${multiplicacion(2, 7)}</td>
      </tr>
      <tr>
        <td>20/4</td>
        <td>${division(20, 4)}</td>
      </tr>
    </tbody>
    </table>
    </body>
  `);
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

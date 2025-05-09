import {calculadoraImpuestos,esPar,tuNombre} from "./modulo1.js";
import { createServer } from 'node:http';

var a=10;

const server = createServer((_, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`

    <table>
    <thead class="table-primary">
      <tr>
        <th>Operacion</th>
        <th>Resultado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Producto con impuestos a la compra en el extranjero: ${a} </td>
        <td>${calculadoraImpuestos(a)}</td>
      </tr>
      <tr>
        <td>el numero ${a} es par?</td>
        <td>${esPar(a)}</td>
      </tr>
      <tr>
        <td>Cual es tu nombre?</td>
        <td>${tuNombre(b)}</td>
      </tr>
    </tbody>
    </table>
  `);
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
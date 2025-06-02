const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/guardar', (req, res) => {
    const datos = req.body.numeros;

    

    const numeros = datos.split(',').map(n => parseInt(n.trim()));

    const invalidos = numeros.filter(n => isNaN(n));

    if (invalidos.length > 0) {
        return res.send(`<p style="text-align: center;margin-bottom: 20px;font-family: 'Segoe UI', sans-serif;color: #333;">Error: debe ingresar numeros y no datos</p>`);
    }
    if(numeros.length>20 || numeros.length<10  ){
        return res.send(`<p style="text-align: center;margin-bottom: 20px;font-family: 'Segoe UI', sans-serif;color: #333;">Error: debe ingresar entre 10 y 20 datos</p>`);
    }

    const contenido = numeros.join(', ') + '\n';

    fs.writeFile('numeros.txt', contenido, (err) => {
        if (err) {
            console.error(err);
            return res.send('Error al guardar el archivo.');
        }
        res.send(`<p style="text-align: center;margin-bottom: 20px;font-family: 'Segoe UI', sans-serif;color: #333;">Datos guardados correctamente en "numeros.txt"</p><div style="display:flex;justify-content:center"><a href="/" style="text-align: center;margin-bottom: 20px;font-family: 'Segoe UI', sans-serif;color: #333;margin-top: 20px;padding: 12px;background: #2980b9;color: white;border: none;border-radius: 5px;cursor: pointer;font-size: 16px;transition: background 0.3s ease;">Volver</a></div>`);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

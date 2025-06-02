const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3002;

app.use(express.static('public'));

// Solo aceptar archivos .txt
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, 'archivo-subido.txt')
});

const fileFilter = (req, file, cb) => {
    if (path.extname(file.originalname) !== '.txt') {
        return cb(new Error('Solo se permiten archivos .txt'));
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter });

app.post('/procesar', upload.single('archivo'), (req, res) => {
    const archivoPath = path.join(__dirname, 'uploads', req.file.filename);

    fs.readFile(archivoPath, 'utf8', (err, data) => {
        if (err) return res.send('<h2>Error al leer el archivo</h2>');

        const todos = data
            .split(',')
            .map(n => n.trim())
            .filter(n => /^\d+$/.test(n)); // Solo dígitos

        const validos = [];
        const noValidos = [];

        for (const n of todos) {
            if (n[0] === n[n.length - 1]) {
                validos.push(parseInt(n));
            } else {
                noValidos.push(n);
            }
        }

        validos.sort((a, b) => a - b);

        const total = validos.length + noValidos.length;
        const porcentajes = (validos.length/total)*100;

        // Construir resultado
        let resultadoHTML = `
            <link rel="stylesheet" href="css/style.css">
            
            
            <div class="container"><h1>Resultado del Análisis</h1>
            <h2><strong>Válidos (${validos.length}):</strong> ${validos.join(', ')}</h2>
            <h2>
                ${porcentajes}%
            </h2>
            <h2><strong>No válidos (${noValidos.length}):</strong> ${noValidos.join(', ') || 'Ninguno'}</h2>
            <button><a href="/">Subir otro archivo</a></button></div>
            
        `;

        // Construir texto para guardar
        const resultadoTxt = `
RESULTADOS DEL ANÁLISIS

Números válidos (${validos.length}): ${validos.join(', ')}
Porcentajes:
${porcentajes}

Números no válidos (${noValidos.length}): ${noValidos.join(', ') || 'Ninguno'}
`;

        // Guardar en archivo
        const outputPath = path.join(__dirname, 'uploads', 'resultados.txt');
        fs.writeFile(outputPath, resultadoTxt, (err) => {
            if (err) console.error('Error al guardar resultados:', err);
        });

        res.send(resultadoHTML);
    });
});

// Manejar errores por tipo de archivo
app.use((err, req, res, next) => {
    if (err.message.includes('Solo se permiten archivos .txt')) {
        return res.send('<h2>Error: Solo se permiten archivos .txt</h2><a href="/">Volver</a>');
    }
    res.send('<h2>Ha ocurrido un error inesperado.</h2>');
});

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});

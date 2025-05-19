const express = require("express");
const path = require("path");
const app = express();

const numeros = [10, 20, 30, 40, 50];
const mensajesChat = [
    "Hola, ¿cómo estás?",
    "¿Recibiste mi correo?",
    "Nos vemos mañana"
];
const colaAtencion = [
    "Cliente #001 - Problema con factura",
    "Cliente #002 - Consulta técnica",
    "Cliente #003 - Solicitud de devolución"
];

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { 
        numeros, 
        mensajesChat, 
        colaAtencion 
    });
});

app.post("/eliminar-primer-numero", (req, res) => {
    const numeroEliminado = numeros.shift();
    res.json({ 
        success: true,
        message: `Número eliminado: ${numeroEliminado || 'N/A'}`,
        numeros
    });
});

app.post("/eliminar-primer-mensaje", (req, res) => {
    const mensajeEliminado = mensajesChat.shift();
    res.json({ 
        success: true,
        message: `Mensaje eliminado: "${mensajeEliminado || 'N/A'}"`,
        mensajesChat
    });
});

app.post("/atender-cliente", (req, res) => {
    const clienteAtendido = colaAtencion.shift();
    res.json({ 
        success: true,
        message: `Cliente atendido: ${clienteAtendido || 'No hay clientes en espera'}`,
        colaAtencion
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
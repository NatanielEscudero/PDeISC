const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});
 
app.post("/decodificar", (req, res) => {
    const mensajeCodificado = req.body.mensaje || "";
     
    const decodificarMensaje = (texto) => {
        let resultado = "";
        let pila = [];
        let temp = "";
        
        for (let i = 0; i < texto.length; i++) {
            const char = texto[i];
            
            if (char === '(') {
                pila.push(temp);
                temp = "";
            } else if (char === ')') {
                temp = pila.pop() + temp.split('').reverse().join('');
            } else {
                temp += char;
            }
        }
        
        resultado = temp;
        return resultado;
    };

    const mensajeDecodificado = decodificarMensaje(mensajeCodificado);
    
    res.json({
        success: true,
        mensajeOriginal: mensajeCodificado,
        mensajeDecodificado: mensajeDecodificado
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
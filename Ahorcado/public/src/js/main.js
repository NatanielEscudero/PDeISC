let palabra = "";
let intentos = [];
let puntos = 0;
let tiempoInicio = Date.now();
let enJuego = false;
let procesando= false;
let contadorIntentos = 0;
let tiempoFinal = 0;
document.querySelectorAll(".reset").forEach(btn => {
  btn.addEventListener("click", () => {
    reiniciarJuego();
  });
});
const sonidoAcierto = new Audio("src/sounds/acierto.mp3");
const sonidoError = new Audio("src/sounds/fallo.mp3");
const video = document.getElementById("Video");
const intentosDiv = document.getElementById("intentos");
const puntosDiv = document.getElementById("puntosDiv");
const guardar = document.getElementById("guardar");
const ganaste = document.getElementById("ganaste");
const juegito = document.getElementById("juegito");
const perderJuego = document.getElementById("perderJuego");
const imagenAhorcado = document.getElementById("ahorcado");
const intentosHechos = document.getElementById("intentosHechos");
const nombreInput = document.getElementById("nombre");


// Función para obtener una palabra del servidor
async function obtenerPalabra() {
    const res = await fetch("/api/palabra");
    const data = await res.json();
    palabra = data.palabra;
    video.muted = true;
    enJuego = true;
    mostrarJuego();
}

// Funcion para reiniciar el juego con los botones
function reiniciarJuego(){

    intentos = [];
    puntos = 0;
    tiempoInicio = Date.now();
    contadorIntentos = 0;
    ganaste.style.display = "none";
    nombreInput.style.display = "";
    guardar.style.display = "";
    juegito.style.display = "";
    intentosDiv.textContent = "";
    video.muted = true;
    perderJuego.style.display = "none";
    imagenAhorcado.src = `src/img/hombre.png`;
    enJuego = true;
    obtenerPalabra();
}

// Función para mostrar el juego
function mostrarJuego() {
    let display = palabra.split("").map(l => (intentos.includes(l) ? l : "_")).join(" ");
    document.getElementById("juego").innerHTML = display;

    if (!display.includes("_")) {
        puntos = 100 - (Date.now() - tiempoInicio) / 1000;
        tiempoFinal = Date.now();
        enJuego = false;
        ganaste.style.display = "block";
        juegito.style.display = "none";
        puntosDiv.innerHTML = `${puntos}`;
        mostrarTabla();
        setTimeout(() => {
            video.muted = false;
        }, 2000);
        ganaste=1;
    }
}

// Evento para manejar las teclas presionadas
document.addEventListener("keydown", e => {
    if (!enJuego) return;
    if(procesando) return; // logica para evitar varios intentos al mismo tiempo y evitar que se puedan hacer inputs una vez acabado el juego
    const letra = e.key.toLowerCase();
    
    if (!intentos.includes(letra) && /^[a-z]$/.test(letra)) { // Verifica si la tecla es una letra y no ha sido intentada
        procesando = true;
        if (palabra.includes(letra)) {
            sonidoAcierto.play();
            puntos += 10; // Incrementar puntos por acierto
            setTimeout(() => {
            procesando = false;
        }, 2500);
        } else {
            sonidoError.play();
            contadorIntentos++;
            puntos -= 5; // Decrementar puntos por error
            actualizarImagenAhorcado()
            setTimeout(() => {
            procesando = false;
        }, 4000);
        }
        
        intentos.push(letra); // Agregar la letra ingresada a los intentos
        mostrarIntentos(); // Mostrar intentos realizados
        mostrarJuego(); // Actualizar el display del juego
        
    }
    if(contadorIntentos == 6) {  // Si se alcanzan 6 intentos fallidos, el juego termina
        enJuego = false;
        juegito.style.display = "none";
        ganaste.style.display = "none";
        guardar.style.display = "none";
        perderJuego.style.display = "block";
        return;
    }
    return;
});

guardar.addEventListener("click", async () => {  // Evento para guardar el score
    const nombre = document.getElementById("nombre").value;
    const tiempo = Math.floor((Date.now() - tiempoInicio) / 1000);
    guardar.style.display = "none";
    nombreInput.style.display = "none";

    await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, tiempo, puntos })
    });

    mostrarTabla();
});

document.getElementById("pdf").addEventListener("click", () => {  // Evento para generar el PDF
    const nombre = document.getElementById("nombre").value;
    const tiempo = Math.floor((tiempoFinal - tiempoInicio) / 1000);

    window.open(`/api/pdf?nombre=${nombre}&tiempo=${tiempo}&puntos=${puntos}`);
});

async function mostrarTabla() { // Función para mostrar la tabla de scores
    const res = await fetch("/api/scores");
    const scores = await res.json();
    const html = scores.map(s => `<li>${s.nombre} - ${s.puntos} - ${s.tiempo}s</li>`).join("");
    document.getElementById("posiciones").innerHTML = `<ul>${html}</ul>`;
}

function mostrarIntentos() { // Función para mostrar los intentos realizados
  intentosDiv.textContent = intentos.join(" - ");
  intentosHechos.textContent = `${contadorIntentos}`;
}


function actualizarImagenAhorcado() { // Función para actualizar la imagen del ahorcado
    imagenAhorcado.src = `src/img/hombre${contadorIntentos}.png`;
}

obtenerPalabra();

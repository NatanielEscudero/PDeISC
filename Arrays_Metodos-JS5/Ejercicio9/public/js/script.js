function mostrarMensaje(texto, tipo = 'success') {
    const message = document.getElementById('message');
    message.textContent = texto;
    message.className = `message ${tipo}`;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}
 
document.getElementById('saludarNombresForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/saludar-nombres', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultadoContainer = document.getElementById('saludos-resultado');
            resultadoContainer.innerHTML = data.resultado.map(saludo => 
                `<div class="resultado-item">${saludo}</div>`
            ).join('');
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al generar saludos', 'error');
    }
});
 
document.getElementById('calcularDoblesForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/calcular-dobles', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultadoContainer = document.getElementById('dobles-resultado');
            resultadoContainer.innerHTML = data.resultado.map((doble, index) => 
                `<div class="resultado-item">${numeros[index]} x 2 = ${doble}</div>`
            ).join('');
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al calcular dobles', 'error');
    }
});
 
document.getElementById('mostrarPersonasForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/mostrar-personas', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultadoContainer = document.getElementById('personas-resultado');
            resultadoContainer.innerHTML = data.resultado.map(info => 
                `<div class="resultado-item">${info}</div>`
            ).join('');
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al mostrar personas', 'error');
    }
});
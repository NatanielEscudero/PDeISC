function mostrarMensaje(texto, tipo = 'success') {
    const message = document.getElementById('message');
    message.textContent = texto;
    message.className = `message ${tipo}`;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}
 
document.getElementById('ordenarNumerosForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/ordenar-numeros', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultadoContainer = document.getElementById('numeros-resultado');
            resultadoContainer.innerHTML = data.resultado.map(num => 
                `<div class="resultado-item">${num}</div>`
            ).join('');
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al ordenar números', 'error');
    }
});
 
document.getElementById('ordenarPalabrasForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/ordenar-palabras', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultadoContainer = document.getElementById('palabras-resultado');
            resultadoContainer.innerHTML = data.resultado.map(palabra => 
                `<div class="resultado-item">${palabra}</div>`
            ).join('');
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al ordenar palabras', 'error');
    }
});
 
document.getElementById('ordenarPersonasForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/ordenar-personas', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultadoContainer = document.getElementById('personas-resultado');
            resultadoContainer.innerHTML = data.resultado.map(persona => 
                `<div class="resultado-item">
                    ${persona.nombre} (${persona.edad} años)
                </div>`
            ).join('');
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al ordenar personas', 'error');
    }
});
function mostrarMensaje(texto, tipo = 'success') {
    const message = document.getElementById('message');
    message.textContent = texto;
    message.className = `message ${tipo}`;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}
 
document.getElementById('invertirLetrasForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/invertir-letras', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultadoContainer = document.getElementById('letras-resultado');
            resultadoContainer.innerHTML = data.resultado.map(letra => 
                `<span class="resultado-item">${letra}</span>`
            ).join('');
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al invertir letras', 'error');
    }
});
 
document.getElementById('invertirNumerosForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/invertir-numeros', {
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
                `<span class="resultado-item">${num}</span>`
            ).join('');
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al invertir números', 'error');
    }
});
 
document.getElementById('invertirTextoForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/invertir-texto', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultadoContainer = document.getElementById('texto-resultado');
            resultadoContainer.innerHTML = `
                <div class="texto-invertido">${data.resultado}</div>
            `;
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al invertir texto', 'error');
    }
});
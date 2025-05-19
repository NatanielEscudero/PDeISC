function mostrarMensaje(texto, tipo = 'success') {
    const message = document.getElementById('message');
    message.textContent = texto;
    message.className = `message ${tipo}`;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}
 
document.getElementById('filtrarNumerosForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/filtrar-numeros', {
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
        mostrarMensaje('Error al filtrar números', 'error');
    }
});
 
document.getElementById('filtrarPalabrasForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/filtrar-palabras', {
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
                `<div class="resultado-item">${palabra} (${palabra.length} letras)</div>`
            ).join('');
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al filtrar palabras', 'error');
    }
});
 
document.getElementById('filtrarUsuariosForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/filtrar-usuarios', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultadoContainer = document.getElementById('usuarios-resultado');
            resultadoContainer.innerHTML = data.resultado.map(usuario => 
                `<div class="resultado-item">
                    <strong>${usuario.nombre}</strong> - ${usuario.activo ? 'Activo' : 'Inactivo'}
                </div>`
            ).join('');
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al filtrar usuarios', 'error');
    }
});
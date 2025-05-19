function mostrarMensaje(texto, tipo = 'success') {
    const message = document.getElementById('message');
    message.textContent = texto;
    message.className = `message ${tipo}`;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}

function mostrarResultado(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = items.map(item => 
        `<span class="array-item">${item}</span>`
    ).join('');
}

document.getElementById('copiarNumerosForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/copiar-primeros-numeros', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarResultado('numeros-resultado', data.resultado);
            mostrarMensaje(data.message);
        } else {
            mostrarMensaje(data.message, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al copiar números', 'error');
    }
});

document.getElementById('copiarPeliculasForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/copiar-peliculas', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarResultado('peliculas-resultado', data.resultado);
            mostrarMensaje(data.message);
        } else {
            mostrarMensaje(data.message, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al copiar películas', 'error');
    }
});

document.getElementById('copiarElementosForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/copiar-ultimos-elementos', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarResultado('elementos-resultado', data.resultado);
            mostrarMensaje(data.message);
        } else {
            mostrarMensaje(data.message, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al copiar elementos', 'error');
    }
});
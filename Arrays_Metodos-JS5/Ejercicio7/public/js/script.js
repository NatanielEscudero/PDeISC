function mostrarMensaje(texto, tipo = 'success') {
    const message = document.getElementById('message');
    message.textContent = texto;
    message.className = `message ${tipo}`;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}
 
document.getElementById('buscarPerroForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/buscar-perro', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('perro-resultado').textContent = data.message;
            mostrarMensaje(data.message);
             
            if (data.posicion !== -1) {
                const items = document.querySelectorAll('.operacion-container:nth-child(1) .array-item');
                items.forEach((item, index) => {
                    item.classList.remove('highlight');
                    if (index === data.posicion) {
                        item.classList.add('highlight');
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al buscar "perro"', 'error');
    }
});
 
document.getElementById('buscarNumeroForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/buscar-numero', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('numero-resultado').textContent = data.message;
            mostrarMensaje(data.message);
             
            if (data.posicion !== -1) {
                const items = document.querySelectorAll('.operacion-container:nth-child(2) .array-item');
                items.forEach((item, index) => {
                    item.classList.remove('highlight');
                    if (index === data.posicion) {
                        item.classList.add('highlight');
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al buscar número 50', 'error');
    }
});
 
document.getElementById('buscarMadridForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/buscar-madrid', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('madrid-resultado').textContent = data.message;
            mostrarMensaje(data.message);
             
            if (data.posicion !== -1) {
                const items = document.querySelectorAll('.operacion-container:nth-child(3) .array-item');
                items.forEach((item, index) => {
                    item.classList.remove('highlight');
                    if (index === data.posicion) {
                        item.classList.add('highlight');
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al buscar "Madrid"', 'error');
    }
});
function mostrarMensaje(texto, tipo = 'success') {
    const message = document.getElementById('message');
    message.textContent = texto;
    message.className = `message ${tipo}`;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}
 
document.getElementById('verificarAdminForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/verificar-admin', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('admin-resultado').textContent = data.message;
            mostrarMensaje(data.message);
             
            if (data.existe) {
                const items = document.querySelectorAll('.operacion-container:nth-child(1) .array-item');
                items.forEach(item => {
                    item.classList.remove('highlight');
                    if (item.textContent.includes('admin')) {
                        item.classList.add('highlight');
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al verificar admin', 'error');
    }
});
 
document.getElementById('verificarVerdeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/verificar-verde', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('verde-resultado').textContent = data.message;
            mostrarMensaje(data.message);
             
            if (data.existe) {
                const items = document.querySelectorAll('.operacion-container:nth-child(2) .array-item');
                items.forEach(item => {
                    item.classList.remove('highlight');
                    if (item.textContent.includes('verde')) {
                        item.classList.add('highlight');
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al verificar verde', 'error');
    }
});
 
document.getElementById('agregarNumeroForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const numero = formData.get('numero');
    
    try {
        const response = await fetch('/agregar-numero', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ numero })
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('numero-resultado').textContent = data.message;
            mostrarMensaje(data.message);
            
            if (data.agregado) { 
                const container = document.querySelector('.operacion-container:nth-child(3) .array-items');
                container.innerHTML = data.numeros.map(num => 
                    `<span class="array-item">${num}</span>`
                ).join('');
                 
                this.reset();
            }
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al agregar número', 'error');
    }
});
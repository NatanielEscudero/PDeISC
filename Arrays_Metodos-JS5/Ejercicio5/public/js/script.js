function mostrarMensaje(texto, tipo = 'success') {
    const message = document.getElementById('message');
    message.textContent = texto;
    message.className = `message ${tipo}`;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}

function actualizarArray(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = items.map(item => 
        `<span class="array-item">${item}</span>`
    ).join('');
}

document.getElementById('eliminarLetrasForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    fetch('/eliminar-letras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            actualizarArray('letras-container', data.letras);
            mostrarMensaje(data.message);
        } else {
            mostrarMensaje(data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensaje('Error al eliminar letras', 'error');
    });
});
 
document.getElementById('insertarNombreForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const nombre = formData.get('nombre');
    
    fetch('/insertar-nombre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            actualizarArray('nombres-container', data.nombres);
            mostrarMensaje(data.message);
            this.reset();
        } else {
            mostrarMensaje(data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensaje('Error al insertar nombre', 'error');
    });
});
 
document.getElementById('reemplazarElementosForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        posicion: formData.get('posicion'),
        nuevo1: formData.get('nuevo1'),
        nuevo2: formData.get('nuevo2')
    };
    
    fetch('/reemplazar-elementos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            actualizarArray('elementos-container', data.elementos);
            mostrarMensaje(data.message);
            this.reset();
        } else {
            mostrarMensaje(data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensaje('Error al reemplazar elementos', 'error');
    });
});
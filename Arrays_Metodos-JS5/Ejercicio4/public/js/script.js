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
    const container = document.querySelector(`#${containerId} .array-container`);
    if (items.length === 0) {
        container.innerHTML = '<div class="empty-message">No hay elementos</div>';
    } else {
        container.innerHTML = items.map(item => 
            `<div class="array-item">${item}</div>`
        ).join('');
    }
}

document.getElementById('formNumeros').addEventListener('submit', function(e) {
    e.preventDefault();
    
    fetch('/eliminar-primer-numero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        mostrarMensaje(data.message);
        actualizarArray('formNumeros', data.numeros);
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensaje('Error al eliminar número', 'error');
    });
});

document.getElementById('formChat').addEventListener('submit', function(e) {
    e.preventDefault();
    
    fetch('/eliminar-primer-mensaje', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        mostrarMensaje(data.message);
        actualizarArray('formChat', data.mensajesChat);
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensaje('Error al eliminar mensaje', 'error');
    });
});

document.getElementById('formAtencion').addEventListener('submit', function(e) {
    e.preventDefault();
    
    fetch('/atender-cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        mostrarMensaje(data.message);
        actualizarArray('formAtencion', data.colaAtencion);
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensaje('Error al atender cliente', 'error');
    });
});
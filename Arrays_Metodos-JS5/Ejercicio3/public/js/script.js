function mostrarMensaje(texto, tipo = 'success') {
    const message = document.getElementById('message');
    message.textContent = texto;
    message.className = `message ${tipo}`;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}
 
document.getElementById('formColores').addEventListener('submit', function(e) {
    e.preventDefault();
    
    fetch('/agregar-colores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const coloresList = document.getElementById('coloresList');
            coloresList.innerHTML = data.colores.map(color => 
                `<div>${color}</div>`).join('');
            mostrarMensaje(data.message);
        } else {
            mostrarMensaje(data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensaje('Error al agregar colores', 'error');
    });
});
 
document.getElementById('formTareas').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const tarea = formData.get('tarea');
    
    fetch('/agregar-tarea', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tarea })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const tareasList = document.getElementById('tareasList');
            tareasList.innerHTML = data.tareas.map(tarea => 
                `<div>${tarea}</div>`).join('');
            mostrarMensaje(data.message);
            this.reset();
        } else {
            mostrarMensaje(data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensaje('Error al agregar tarea', 'error');
    });
}); 

document.getElementById('formUsuarios').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const usuario = formData.get('usuario');
    
    fetch('/agregar-usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const usuariosList = document.getElementById('usuariosList');
            usuariosList.innerHTML = data.usuariosConectados.map(user => 
                `<div>${user}</div>`).join('');
            mostrarMensaje(data.message);
            this.reset();
        } else {
            mostrarMensaje(data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensaje('Error al agregar usuario', 'error');
    });
});
function mostrarMensaje(texto, tipo = 'success') {
    const message = document.getElementById('message');
    message.textContent = texto;
    message.className = tipo;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}

function addField(type) {
    const container = document.getElementById(`${type}-container`);
    const newField = document.createElement('div');
    newField.className = 'input-group';
    
    const placeholder = type === 'animal' ? 'Nombre del animal' : 'Agregue tarea';
    
    newField.innerHTML = `
        <input type="text" name="${type}" placeholder="${placeholder}">
        <button type="button" class="btn-remove" onclick="removeField(this)">Eliminar</button>
    `;
    
    container.appendChild(newField);
}

function removeField(button) {
    const container = button.parentElement.parentElement;
    if (container.children.length > 1) {
        button.parentElement.remove();
    } else {
        button.parentElement.querySelector('input').value = '';
    }
}

document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const animales = Array.from(document.querySelectorAll('input[name="animal"]'))
        .map(input => input.value.trim())
        .filter(value => value !== '');
    
    const compras = Array.from(document.querySelectorAll('input[name="compra"]'))
        .map(input => input.value.trim())
        .filter(value => value !== '');
    
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            animales: animales,
            compras: compras
        })
    })
    .then(response => response.json())
    .then(data => {
        mostrarMensaje('Datos guardados correctamente!');
        
        updateTable('animalesTable', data.animales);
        updateTable('compraTable', data.compras);
        
        document.querySelectorAll(`.input-group:not(:first-child)`).forEach(group => {
            group.remove();
        });
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensaje('Error al guardar los datos', 'error');
    });
});

function updateTable(tableId, data) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const tbody = table.querySelector('tbody');
    if (!tbody) return;
    
    tbody.innerHTML = data && data.length > 0 
        ? data.map(item => `<tr><td>${item}</td></tr>`).join('')
        : `<tr><td>No hay datos registrados</td></tr>`;
}

async function eliminarUltimoAnimal() {
    try {
        const response = await fetch('/eliminar-ultimo-animal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        
        if (result.success) {
            updateTable('animalesTable', result.animales);
            mostrarMensaje(result.message);
        } else {
            mostrarMensaje(result.message, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al eliminar', 'error');
    }
}

async function eliminarUltimaCompra() {
    try {
        const response = await fetch('/eliminar-ultima-compra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        
        if (result.success) {
            updateTable('compraTable', result.compras);
            mostrarMensaje(result.message);
        } else {
            mostrarMensaje(result.message, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al eliminar', 'error');
    }
}

async function limpiarTodo() {
    try {
        const response = await fetch('/limpiar-todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        
        if (result.success) {
            updateTable('animalesTable', result.animales);
            updateTable('compraTable', result.compras);
            mostrarMensaje(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al limpiar los datos', 'error');
    }
}
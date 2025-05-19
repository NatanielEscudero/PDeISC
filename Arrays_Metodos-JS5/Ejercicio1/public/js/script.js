function addField(type) {
    const container = document.getElementById(`${type}s-container`);
    const newField = document.createElement('div');
    newField.className = 'input-group';
    
    let inputType = 'text';
    if (type === 'numero') inputType = 'number';
    
    newField.innerHTML = `
        <input type="${inputType}" name="${type}" placeholder="${type === 'amigo' ? 'Nombre del amigo' : type === 'fruta' ? 'Nombre de la fruta' : 'Número'}">
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
    
    const amigos = Array.from(document.querySelectorAll('input[name="amigo"]'))
        .map(input => input.value.trim())
        .filter(value => value !== '');
    
    const frutas = Array.from(document.querySelectorAll('input[name="fruta"]'))
        .map(input => input.value.trim())
        .filter(value => value !== '');
        
    const numeros = Array.from(document.querySelectorAll('input[name="numero"]'))
        .map(input => Number(input.value))
        .filter(value => !isNaN(value));
    
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            personas: amigos,
            frutas: frutas,
            numeros: numeros
        })
    })
    .then(response => response.json())
    .then(data => {
        const message = document.getElementById('message');
        message.textContent = 'Datos guardados correctamente!';
        message.className = 'success';
        message.style.display = 'block';
        
        updateTable('amigosTable', data.personas);
        updateTable('frutasTable', data.frutas);
        updateTable('numerosTable', data.numeros);

        document.querySelectorAll('.input-group:not(:first-child)').forEach(group => {
            group.remove();
        });
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
        
        setTimeout(() => {
            message.style.display = 'none';
        }, 3000);
    })
    .catch(error => {
        console.error('Error:', error);
        const message = document.getElementById('message');
        message.textContent = 'Error al guardar los datos';
        message.className = 'error';
        message.style.display = 'block';
    });
});

function updateTable(tableId, data) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const tbody = table.querySelector('tbody');
    if (!tbody) return;
    
    if (data && data.length > 0) {
        tbody.innerHTML = data.map(item => `
            <tr>
                <td>${item}</td>
            </tr>
        `).join('');
    } else {
        tbody.innerHTML = `
            <tr>
                <td>No hay datos registrados</td>
            </tr>
        `;
    }
}
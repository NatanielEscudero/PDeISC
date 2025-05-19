function mostrarMensaje(texto, tipo = 'success') {
    const message = document.getElementById('message');
    message.textContent = texto;
    message.className = `message ${tipo}`;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
} 
    
document.getElementById('multiplicarNumerosForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/multiplicar-numeros', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultadoContainer = document.getElementById('numeros-resultado');
            resultadoContainer.innerHTML = data.resultado.map((num, index) => 
                `<div class="resultado-item">
                    ${data.original[index]} × 3 = <strong>${num}</strong>
                </div>`
            ).join('');
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al multiplicar números', 'error');
    }
});
 
document.getElementById('convertirMayusculasForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/convertir-mayusculas', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultadoContainer = document.getElementById('nombres-resultado');
            resultadoContainer.innerHTML = data.resultado.map((nombre, index) => 
                `<div class="resultado-item">
                    ${data.original[index]} → <strong>${nombre}</strong>
                </div>`
            ).join('');
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al convertir nombres', 'error');
    }
});
 
document.getElementById('agregarIvaForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/agregar-iva', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultadoContainer = document.getElementById('precios-resultado');
            resultadoContainer.innerHTML = data.resultado.map((item, index) => 
                `<div class="resultado-item precio-item">
                    <div>Base: $${data.original[index]}</div>
                    <div>IVA (21%): $${item.iva}</div>
                    <div class="precio-total">Total: <strong>$${item.total}</strong></div>
                </div>`
            ).join('');
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al agregar IVA', 'error');
    }
});
function mostrarMensaje(texto, tipo = 'success') {
    const message = document.getElementById('message');
    message.textContent = texto;
    message.className = `message ${tipo}`;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}
 
document.getElementById('sumarNumerosForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/sumar-numeros', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultadoContainer = document.getElementById('suma-resultado');
            resultadoContainer.innerHTML = `
                <div class="operacion">${data.array.join(' + ')}</div>
                <div class="total">= ${data.resultado}</div>
            `;
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al sumar números', 'error');
    }
});
 
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
            const resultadoContainer = document.getElementById('multiplicacion-resultado');
            resultadoContainer.innerHTML = `
                <div class="operacion">${data.array.join(' × ')}</div>
                <div class="total">= ${data.resultado}</div>
            `;
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al multiplicar números', 'error');
    }
});
 
document.getElementById('sumarPreciosForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const response = await fetch('/sumar-precios', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultadoContainer = document.getElementById('precios-resultado');
            resultadoContainer.innerHTML = `
                <div class="operacion">${data.array.map(p => `$${p.precio}`).join(' + ')}</div>
                <div class="total">= $${data.resultado}</div>
            `;
            mostrarMensaje(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al sumar precios', 'error');
    }
});
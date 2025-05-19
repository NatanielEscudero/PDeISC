document.getElementById('decodificarForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const mensaje = document.getElementById('mensaje').value;
    
    fetch('/decodificar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mensaje: mensaje })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const resultadoDiv = document.getElementById('mensajeDecodificado');
            resultadoDiv.innerHTML = `
                <div class="original">
                    <strong>Original:</strong> ${data.mensajeOriginal}
                </div>
                <div class="decodificado">
                    <strong>Decodificado:</strong> ${data.mensajeDecodificado}
                </div>
            `;
             
            document.getElementById('resultado').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al decodificar el mensaje');
    });
});
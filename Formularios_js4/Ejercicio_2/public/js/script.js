document.getElementById('productoForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    deporte: e.target.deporte.value,
    herramienta: e.target.herramienta.value,
    precio: parseFloat(e.target.precio.value),
    categoria: e.target.categoria.value
  };

  try {
    const response = await fetch('/agregar-producto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    
    if (data.success) {

      const mensaje = document.getElementById('mensaje');
      mensaje.textContent = 'Producto agregado correctamente!';
      mensaje.style.display = 'block';
      
      setTimeout(() => {
        mensaje.style.display = 'none';
      }, 3000);
      
      actualizarTabla(data.productos);
      
      e.target.reset();
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

function actualizarTabla(productos) {
  const tbody = document.querySelector('#tablaProductos tbody');
  
  if (productos.length > 0) {
    tbody.innerHTML = productos.map(producto => `
      <tr>
        <td>${producto.deporte}</td>
        <td>${producto.herramienta}</td>
        <td>$${producto.precio.toFixed(2)}</td>
        <td>${producto.categoria}</td>
      </tr>
    `).join('');
  } else {
    tbody.innerHTML = '<tr><td colspan="4">No hay productos registrados</td></tr>';
  }
}
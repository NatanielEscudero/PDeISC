document.getElementById('personaForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = {};
      formData.forEach((value, key) => data[key] = value);
      
      fetch('/api/personas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        // Mostrar mensaje de éxito
        const message = document.getElementById('message');
        message.textContent = 'Persona registrada correctamente!';
        message.className = 'success';
        message.style.display = 'block';
        
        // Actualizar la tabla
        updateTable(result.personas);
        
        // Limpiar el formulario
        this.reset();
        
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
          message.style.display = 'none';
        }, 3000);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
    
    function updateTable(personas) {
      const table = document.getElementById('personasTable');
      table.innerHTML = personas.map(persona => `
        <tr>
          <td>${persona.nombre}</td>
          <td>${persona.apellido}</td>
          <td>${persona.edad}</td>
          <td>${persona.documento}</td>
          <td>${persona.telefono || ''}</td>
        </tr>
      `).join('');
    }
  
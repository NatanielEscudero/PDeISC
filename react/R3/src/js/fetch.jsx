fetch('/api/alumnos')
.then(res => res.json()) 
.then(data => {
    data.forEach(a => {
      const li = document.createElement('li');  // Crea un nuevo elemento li para cada alumno
      li.textContent = `${a.nombre} - Nota: ${a.nota}`; // Muestra el nombre y la nota del alumno
      document.getElementById('alumnos').appendChild(li);   // Agrega el li al elemento ul con id 'alumnos'
    });
});
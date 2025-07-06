const form = document.getElementById('form');
form.addEventListener('submit', e => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  const data = {
    name: form.name.value,
    email: form.email.value
  };

  axios.post('https://jsonplaceholder.typicode.com/users', data)    // Hacer una petición POST a la API
    .then(res => {
      document.getElementById('mensaje').textContent =  // Mostrar mensaje de éxito
        `Usuario creado con ID: ${res.data.id}`;  // Mostrar ID del nuevo usuario
    });
});
  
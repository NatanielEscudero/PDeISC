let usuarios = [];

fetch('https://jsonplaceholder.typicode.com/users') // Realiza una petición GET a la API para obtener los usuarios
  .then(res => res.json())
  .then(data => {
    usuarios = data;
    mostrar(usuarios);
  });

document.getElementById('filtro').addEventListener('input', e => {
  const texto = e.target.value.toLowerCase();   // Convierte el texto ingresado a minúsculas para una búsqueda insensible a mayúsculas
  const filtrados = usuarios.filter(u =>
    u.name.toLowerCase().includes(texto)    // Filtra los usuarios cuyo nombre incluye el texto ingresado
  );
  mostrar(filtrados);
});

function mostrar(arr) {
  const ul = document.getElementById('lista');  // Obtiene el elemento ul donde se mostrarán los usuarios
  ul.innerHTML = '';    // Limpia la lista antes de mostrar los usuarios filtrados
  arr.forEach(u => {
    const li = document.createElement('li'); // Crea un nuevo elemento li para cada usuario
    li.textContent = `${u.name} - ${u.email}`;  // Muestra el nombre y el email del usuario
    ul.appendChild(li); // Crea un nuevo elemento li y lo agrega a la lista
  });
}
  
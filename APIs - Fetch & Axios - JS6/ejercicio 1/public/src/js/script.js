 fetch('https://jsonplaceholder.typicode.com/users') // Hacer una petición GET a la API
      .then(res => res.json())
      .then(data => { 
        data.forEach(u => { 
          const li = document.createElement('li');  // Crear un nuevo elemento de lista
          li.textContent = `${u.name} - ${u.email}`; // Mostrar nombre y email
          document.getElementById('fetchList').appendChild(li); // Añadir el elemento a la lista de Fetch
        });
      });

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
    script.onload = () => {
      axios.get('https://jsonplaceholder.typicode.com/users') // Cargar Axios desde CDN
        .then(res => {
          res.data.forEach(u => {
            const li = document.createElement('li'); // Crear un nuevo elemento de lista
            li.textContent = `${u.name} - ${u.email}`; // Mostrar nombre y email
            document.getElementById('axiosList').appendChild(li); // Añadir el elemento a la lista de Axios
          });
        });
    };
    document.body.appendChild(script);
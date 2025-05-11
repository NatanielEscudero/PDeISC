const form = document.getElementById('registerForm');
const message = document.getElementById('message');
const userList = document.querySelector('ul');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Crear objeto con los datos del formulario
    const formData = {
        usr: form.usr.value,
        pass: form.pass.value
    };

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const personas = await response.json();
            updateUserList(personas);
            message.style.display = 'block';
            form.reset();
            setTimeout(() => message.style.display = 'none', 3000);
        } else {
            alert('Error al registrar el usuario');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error al registrar el usuario');
    }
});

function updateUserList(personas) {
    userList.innerHTML = personas.length > 0 
        ? personas.map(persona => `<li>Usuario: ${persona.usr}</li>`).join('')
        : '<li>No hay personas registradas.</li>';
}
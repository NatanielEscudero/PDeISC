document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            console.log('Formulario enviado');
        });
    }
});
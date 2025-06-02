
document.addEventListener('DOMContentLoaded', () => {
    const inputArchivo = document.getElementById('archivo');
    const mensaje = document.getElementById('mensaje');

    inputArchivo.addEventListener('change', () => {
        if (inputArchivo.files.length > 0) {
            // Solo mostramos si es un archivo .txt
            const archivo = inputArchivo.files[0];
            if (archivo.name.endsWith('.txt')) {
                mensaje.classList.add('visible');
            } else {
                mensaje.classList.remove('visible');
            }
        } else {
            mensaje.classList.remove('visible');
        }
    });
});

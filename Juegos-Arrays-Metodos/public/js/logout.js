document.addEventListener('DOMContentLoaded', function() {
  const logoutBtn = document.getElementById('logout-btn');
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      // Enviar una solicitud al servidor para cerrar sesión
      fetch('/logout', {
        method: 'POST'
      })
      .then(response => {
        if (response.ok) {
          window.location.href = '/'; // Redirigir al login
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  }
});
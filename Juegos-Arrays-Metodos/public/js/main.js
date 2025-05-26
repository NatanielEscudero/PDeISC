document.addEventListener('DOMContentLoaded', function() {
  // Cambiar entre juegos
  const gameButtons = document.querySelectorAll('.game-btn');
  const gameContents = document.querySelectorAll('.game-content');
  
  gameButtons.forEach(button => {
    button.addEventListener('click', () => {
      const game = button.dataset.game;
      
      // Activar botón
      gameButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Mostrar contenido del juego
      gameContents.forEach(content => content.classList.remove('active'));
      document.getElementById(`${game}-game`).classList.add('active');
    });
  });
  
  // Inicializar juegos
  if (document.getElementById('simon-game')) {
    initSimonDice();
  }
  
  if (document.getElementById('tictactoe-game')) {
    initTicTacToe();
  }
  
  if (document.getElementById('rps-game')) {
    initRockPaperScissors();
  }
});
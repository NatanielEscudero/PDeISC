function initSimonDice() {
  const simonButtons = document.querySelectorAll('.simon-btn');
  const startButton = document.getElementById('start-simon');
  const levelDisplay = document.getElementById('simon-level');
  
  let sequence = [];
  let playerSequence = [];
  let level = 0;
  let isPlaying = false;
  
  startButton.addEventListener('click', startGame);
  
  // Función para iniciar el juego
  function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    isPlaying = true;
    startButton.disabled = true;
    nextLevel();
  }
  
  // Función para iniciar y crear el siguiente nivel
  function nextLevel() {
    level++;
    levelDisplay.textContent = level;
    playerSequence = [];
    sequence.push(getRandomColor());
    playSequence();
  }
  
  // Función para obtener un color aleatorio para asociarlo a la secuencia
  function getRandomColor() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  // Función para reproducir la secuencia
  function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= sequence.length) {
        clearInterval(interval);
        return;
      }
      
      const color = sequence[i];
      activateButton(color);
      i++;
    }, 800);
  }
  
  // Función para activar el botón con animación durante la secuencia del nivel
  function activateButton(color) {
    const button = document.querySelector(`.simon-btn.${color}`);
    button.classList.add('active');
    
    setTimeout(() => {
      button.classList.remove('active');
    }, 400);
  }
  
  // Eventos para los botones del simon dice
  simonButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (!isPlaying) return;
      
      const color = button.dataset.color;
      playerSequence.push(color);
      activateButton(color);
      checkSequence();
    });
  });
  
  // Función para verificar la secuencia del jugador
  function checkSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
      if (playerSequence[i] !== sequence[i]) {
        gameOver();
        return;
      }
    }
    
    if (playerSequence.length === sequence.length) {
      setTimeout(nextLevel, 1000);
    }
  }
  
  // Función para finalizar el juego
  function gameOver() {
    isPlaying = false;
    startButton.disabled = false;
    alert(`Game Over! Tu puntuación: ${level - 1}`);
  }
}
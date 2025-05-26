function initRockPaperScissors() {
  const player1Buttons = document.querySelectorAll('.player1-options .rps-btn');
  const player2Buttons = document.querySelectorAll('.player2-options .rps-btn');
  const resetButton = document.getElementById('reset-rps');
  const player1ChoiceDisplay = document.getElementById('rps-player1-choice');
  const opponentChoiceDisplay = document.getElementById('rps-opponent-choice');
  const resultDisplay = document.getElementById('rps-result-text');
  const computerCheckbox = document.getElementById('rps-computer');
  const player2Options = document.querySelector('.player2-options');
  
  let player1Choice = null;
  let player2Choice = null;
  let computerChoice = null;

  // Inicialización del juego
  function initialize() {
    computerCheckbox.addEventListener('change', function() {
      resetGame();
      if (player2Options) {
        player2Options.classList.add('hidden');
      }
    });
    
    // Asegurarse de que el contenedor de oponente esté oculto al inicio
    opponentChoiceDisplay.classList.add('hidden');
  }

  // Eventos para los botones del jugador 1
  player1Buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (player1Choice !== null) return;
      
      player1Choice = button.dataset.choice;
      player1ChoiceDisplay.textContent = `Tú elegiste: ${capitalizeFirstLetter(player1Choice)}`;
      disableButtons(player1Buttons);
      
      if (computerCheckbox.checked) {
        playAgainstComputer();
      } else if (player2Options) {
        player2Options.classList.remove('hidden');
      }
    });
  });

  // Eventos para los botones del jugador 2 (si existen)
  if (player2Buttons.length > 0) {
    player2Buttons.forEach(button => {
      button.addEventListener('click', () => {
        if (player2Choice !== null || computerCheckbox.checked) return;
        
        player2Choice = button.dataset.choice;
        opponentChoiceDisplay.textContent = `${document.querySelector('.player2-options h3').textContent} eligió: ${capitalizeFirstLetter(player2Choice)}`;
        opponentChoiceDisplay.classList.remove('hidden');
        disableButtons(player2Buttons);
        
        determineWinner();
      });
    });
  }

  resetButton.addEventListener('click', resetGame);

  function playAgainstComputer() {
    const choices = ['piedra', 'papel', 'tijeras'];
    computerChoice = choices[Math.floor(Math.random() * 3)];

    // Mostrar elección de la computadora
    setTimeout(() => {
      opponentChoiceDisplay.textContent = `Computadora eligió: ${capitalizeFirstLetter(computerChoice)}`;
      opponentChoiceDisplay.classList.remove('hidden');
      determineWinner();
    }, 500);
  }

  function determineWinner() {
    const choice1 = player1Choice;
    const choice2 = computerCheckbox.checked ? computerChoice : player2Choice;
    
    let result;
    if (choice1 === choice2) {
      result = 'Empate';
    } else if (
      (choice1 === 'piedra' && choice2 === 'tijeras') ||
      (choice1 === 'papel' && choice2 === 'piedra') ||
      (choice1 === 'tijeras' && choice2 === 'papel')
    ) {
      result = 'Ganador';
    } else {
      result = 'Perdedor';
    }

    showResult(result);
  }

  function showResult(result) {
    const player1Name = document.querySelector('.player1-options h3').textContent;
    const opponentName = computerCheckbox.checked ? 'Computadora' : document.querySelector('.player2-options h3').textContent;
    
    if (result === 'Empate') {
      resultDisplay.textContent = '¡Empate!';
    } else if (result === 'Ganador') {
      resultDisplay.textContent = `¡${player1Name} gana!`;
    } else {
      resultDisplay.textContent = `¡${opponentName} gana!`;
    }
    
    resetButton.classList.remove('hidden');
  }

  function resetGame() {
    player1Choice = null;
    player2Choice = null;
    computerChoice = null;
    
    player1ChoiceDisplay.textContent = '';
    opponentChoiceDisplay.textContent = '';
    opponentChoiceDisplay.classList.add('hidden');
    resultDisplay.textContent = '';
    resetButton.classList.add('hidden');
    
    enableButtons(player1Buttons);
    if (player2Buttons.length > 0) {
      enableButtons(player2Buttons);
      if (computerCheckbox.checked && player2Options) {
        player2Options.classList.add('hidden');
      }
    }
  }

  function disableButtons(buttons) {
    buttons.forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = '0.7';
    });
  }

  function enableButtons(buttons) {
    buttons.forEach(btn => {
      btn.disabled = false;
      btn.style.opacity = '1';
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Inicializar el juego
  initialize();
}
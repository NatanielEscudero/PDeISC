function initTicTacToe() {
  const cells = document.querySelectorAll('.tictactoe-cell');
  const resetButton = document.getElementById('reset-tictactoe');
  const turnDisplay = document.getElementById('tictactoe-turn');
  const computerCheckbox = document.getElementById('tictactoe-computer');
  
  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let gameOver = false;
  
  // Obtener nombres de jugadores
  const player1Name = document.querySelector('.players-info span:first-child').textContent.replace('Jugador 1: ', '');
  const player2Name = computerCheckbox.checked ? 'Computadora' : document.querySelector('.players-info span:last-child').textContent.replace('Jugador 2: ', '');
  
  resetButton.addEventListener('click', resetGame);
  computerCheckbox.addEventListener('change', resetGame);
  
  function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    updateTurnDisplay();
    
    cells.forEach(cell => {
      cell.textContent = '';
      cell.style.backgroundColor = '';
      cell.style.pointerEvents = 'auto';
    });
  }
  
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
  
  function handleCellClick(e) {
    if (gameOver) return;
    
    const index = parseInt(e.target.dataset.index);
    
    if (board[index] !== '') return;
    
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    checkWinner();
    
    if (!gameOver) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateTurnDisplay();
      
      if (computerCheckbox.checked && currentPlayer === 'O') {
        disableAllCells();
        setTimeout(computerMove, 500);
      }
    }
  }
  
  function updateTurnDisplay() {
    if (currentPlayer === 'X') {
      turnDisplay.textContent = `${player1Name} (X)`;
    } else {
      turnDisplay.textContent = computerCheckbox.checked ? 
        `Computadora (O)` : 
        `${player2Name} (O)`;
    }
  }
  
  function disableAllCells() {
    cells.forEach(cell => {
      cell.style.pointerEvents = 'none';
    });
  }
  
  function enableAllCells() {
    cells.forEach(cell => {
      cell.style.pointerEvents = 'auto';
    });
  }
  
  function computerMove() {
    if (gameOver) {
      enableAllCells();
      return;
    }
    
    let move = findWinningMove(board, 'O');
    if (move === null) move = findWinningMove(board, 'X');
    if (move === null) {
      const emptyCells = [];
      board.forEach((cell, index) => {
        if (cell === '') emptyCells.push(index);
      });
      if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        move = emptyCells[randomIndex];
      }
    }
    
    if (move !== null) {
      board[move] = 'O';
      cells[move].textContent = 'O';
      
      checkWinner();
      
      if (!gameOver) {
        currentPlayer = 'X';
        updateTurnDisplay();
      }
    }
    
    enableAllCells();
  }
  
  function findWinningMove(board, player) {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] === player && board[b] === player && board[c] === '') return c;
      if (board[a] === player && board[c] === player && board[b] === '') return b;
      if (board[b] === player && board[c] === player && board[a] === '') return a;
    }
    
    return null;
  }
  
  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        highlightWinningCells(a, b, c);
        gameOver = true;
        setTimeout(() => {
          const winner = board[a] === 'X' ? player1Name : computerCheckbox.checked ? 'Computadora' : player2Name;
          alert(`¡${winner} ha ganado!`);
        }, 100);
        return;
      }
    }
    
    if (!board.includes('')) {
      gameOver = true;
      setTimeout(() => {
        alert('¡Empate!');
      }, 100);
    }
  }
  
  function highlightWinningCells(a, b, c) {
    cells[a].style.backgroundColor = '#d4edda';
    cells[b].style.backgroundColor = '#d4edda';
    cells[c].style.backgroundColor = '#d4edda';
  }
  
  // Inicializar display del turno
  updateTurnDisplay();
}
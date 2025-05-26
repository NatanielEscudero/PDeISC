const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// Rutas
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  req.session.player1 = req.body.player1;
  req.session.player2 = req.body.player2 || 'Computadora';
  res.redirect('/games');
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error al cerrar sesión');
    }
    res.sendStatus(200);
  });
});

app.get('/games', (req, res) => {
  if (!req.session.player1) {
    return res.redirect('/');
  }
  res.render('games', {
    player1: req.session.player1,
    player2: req.session.player2
  });
});

// API para los juegos
app.post('/api/play', (req, res) => {
  const game = req.body.game;
  let result;
  
  switch(game) {
    case 'tictactoe':
      result = playTicTacToe(req.body);
      break;
    case 'rps':
      result = playRockPaperScissors(req.body);
      break;
    default:
      result = { error: 'Juego no válido' };
  }
  
  res.json(result);
});

// Lógica de los juegos
function playTicTacToe(data) {
  const board = data.board;
  const player = data.player;
  
  // Verificar si hay ganador
  const winner = checkTicTacToeWinner(board);
  if (winner) {
    return { winner: winner, board: board };
  }
  
  // Si es turno de la computadora y está jugando contra ella
  if (player === 'O' && data.againstComputer === 'true') {
    const emptyCells = [];
    board.forEach((cell, index) => {
      if (cell === '') emptyCells.push(index);
    });
    
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      board[emptyCells[randomIndex]] = 'O';
    }
    
    // Verificar nuevamente si hay ganador después del movimiento de la computadora
    const newWinner = checkTicTacToeWinner(board);
    return { 
      winner: newWinner, 
      board: board,
      computerPlayed: true
    };
  }
  
  return { board: board };
}

function checkTicTacToeWinner(board) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
    [0, 4, 8], [2, 4, 6]             // diagonales
  ];
  
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  
  if (!board.includes('')) return 'Empate';
  return null;
}

function playRockPaperScissors(data) {
  const choices = ['piedra', 'papel', 'tijeras'];
  const playerChoice = data.choice;
  let computerChoice = null;
  let result;
  
  if (data.againstComputer === 'true') {
    computerChoice = choices[Math.floor(Math.random() * 3)];
    
    if (playerChoice === computerChoice) {
      result = 'Empate';
    } else if (
      (playerChoice === 'piedra' && computerChoice === 'tijeras') ||
      (playerChoice === 'papel' && computerChoice === 'piedra') ||
      (playerChoice === 'tijeras' && computerChoice === 'papel')
    ) {
      result = 'Ganaste';
    } else {
      result = 'Perdiste';
    }
  } else {
    // Lógica para dos jugadores (se maneja en el cliente)
    return { playerChoice: playerChoice };
  }
  
  return {
    playerChoice: playerChoice,
    computerChoice: computerChoice,
    result: result
  };
}

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
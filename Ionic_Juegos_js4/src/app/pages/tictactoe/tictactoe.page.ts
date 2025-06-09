import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.page.html',
  styleUrls: ['./tictactoe.page.scss'],
})
export class TictactoePage implements OnInit {
  board: string[] = ['', '', '', '', '', '', '', '', ''];
  currentPlayer: string = 'X';
  gameOver: boolean = false;
  againstComputer: boolean = true;
  players: any = {};

  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.players = this.authService.getCurrentUser() || {};
    this.resetGame();
  }

  resetGame() {
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayer = 'X';
    this.gameOver = false;
  }

  async makeMove(index: number) {
    if (this.gameOver || this.board[index] !== '') return;
    
    this.board[index] = this.currentPlayer;
    
    const result = await this.gameService.playTicTacToe({
      board: this.board,
      player: this.currentPlayer,
      againstComputer: this.againstComputer
    }).toPromise();
    
    if (result.winner) {
      this.gameOver = true;
      const winner = result.winner === 'X' ? this.players.player1 : 
                     this.againstComputer ? 'Computadora' : this.players.player2;
      
      const alert = await this.alertController.create({
        header: '¡Juego terminado!',
        message: result.winner === 'Empate' ? '¡Empate!' : `¡${winner} ha ganado!`,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      if (this.againstComputer && this.currentPlayer === 'O' && !this.gameOver) {
        this.computerMove();
      }
    }
  }

  computerMove() {
    setTimeout(() => {
      const emptyCells = this.board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
      if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        this.makeMove(emptyCells[randomIndex] as number);
      }
    }, 500);
  }
}
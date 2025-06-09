import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient) {}

  playTicTacToe(data: any) {
    return this.http.post(`${API_URL}/play`, {
      game: 'tictactoe',
      ...data
    });
  }

  playRockPaperScissors(data: any) {
    return this.http.post(`${API_URL}/play`, {
      game: 'rps',
      ...data
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  players: any = {};

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.players = this.auth.getCurrentUser() || {};
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  navigateToGame(game: string) {
    this.router.navigate([`/${game}`]);
  }
}
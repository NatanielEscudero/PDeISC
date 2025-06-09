import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials = { player1: '', player2: '' };

  constructor(
    private auth: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...'
    });
    await loading.present();

    this.auth.login(this.credentials).subscribe(
      async () => {
        await loading.dismiss();
        this.router.navigate(['/games']);
      },
      async (error) => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: error.error?.message || 'Error al iniciar sesión',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
    );
  }
}
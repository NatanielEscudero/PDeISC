import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { 
    path: 'games',
    loadChildren: () => import('./pages/games/games.module').then(m => m.GamesPageModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'tictactoe',
    loadChildren: () => import('./pages/tictactoe/tictactoe.module').then(m => m.TictactoePageModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'rps',
    loadChildren: () => import('./pages/rps/rps.module').then(m => m.RpsPageModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'simon',
    loadChildren: () => import('./pages/simon/simon.module').then(m => m.SimonPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
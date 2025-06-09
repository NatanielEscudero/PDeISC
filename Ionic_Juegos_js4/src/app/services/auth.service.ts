// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

const API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) {
    this.loadUser();
  }

  private loadUser() {
    from(this.storage.get('user')).pipe(
      switchMap(user => {
        if (user) {
          return this.http.get(`${API_URL}/games`).pipe(
            map((res: any) => res)
          );
        }
        return this.http.get(`${API_URL}/games`).pipe(
          tap((res: any) => {
            if (!res.error) {
              this.storage.set('user', res);
            }
          }),
          map((res: any) => res.error ? null : res)
        );
      })
    ).subscribe(user => {
      this.currentUserSubject.next(user);
    });
  }

  login(credentials: { player1: string, player2: string }) {
    return this.http.post(`${API_URL}/login`, credentials).pipe(
      tap((res: any) => {
        if (res.success) {
          this.storage.set('user', res);
          this.currentUserSubject.next(res);
        }
      })
    );
  }

  logout() {
    return this.http.post(`${API_URL}/logout`, {}).pipe(
      tap(() => {
        this.storage.remove('user');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
      })
    );
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  isAuthenticated() {
    return !!this.currentUserSubject.value;
  }
}
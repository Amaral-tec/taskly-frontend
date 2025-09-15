import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  login(login: string, password: string): Observable<LoginResponse> {
    const body: LoginRequest = { login, password };

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body).pipe(
      tap((res) => {
        sessionStorage.setItem('auth_token', res.token);
      })
    );
  }

  logout() {
    sessionStorage.removeItem('auth_token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
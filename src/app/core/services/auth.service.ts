import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginDTO, ILoginResponseDTO, IRegisterUserDTO } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly API = `${environment.apiUrl}/Auth`;

  // Login
  login(dto: ILoginDTO): Observable<ILoginResponseDTO> {
    return this._httpClient.post<ILoginResponseDTO>(`${this.API}/login`, dto);
  }

  // Register
  register(dto: IRegisterUserDTO): Observable<{ message: string }> {
    return this._httpClient.post<{ message: string }>(`${this.API}/register`, dto);
  }

  // Logout
  logout(): void {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

  // SaveToken
  saveToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  // GetToken
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Verifica validade do token
  isExpiredToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
  
      const expiredDate = payload.exp * 1000;
      return Date.now() >= expiredDate;

    } catch {
      return true
    }
  }
}

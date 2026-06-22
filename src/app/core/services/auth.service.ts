import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginDTO, ILoginResponseDTO } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/Auth`;

  // Login
  login(dto: ILoginDTO): Observable<ILoginResponseDTO> {
    return this._httpClient.post<ILoginResponseDTO>(`${this.API}/login`, dto);
  }

  // Register

  // Logout

  // SaveToken
  saveToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  // GetToken
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}

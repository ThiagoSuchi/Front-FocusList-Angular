import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";
import { IUserProfileDTO } from "../../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private readonly _httpClient = inject(HttpClient);
    private readonly API = `${environment.apiUrl}/User`;

    getUser(): Observable<IUserProfileDTO> {
        return this._httpClient.get<IUserProfileDTO>(`${this.API}/profile`)
    }

    uploadProfileImage(file: File): Observable<IUserProfileDTO> {
        // Para upload de arquivo via formulário HTTP é usado multipart/form-data 
        // e o FormData faz isso automáticamente
        const formData = new FormData();

        formData.append('file', file);

        return this._httpClient.post(`${this.API}/profile/image`, formData);
    }
}
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
}
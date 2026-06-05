import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { DesignAuth } from '../../components/shared/design-auth/design-auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, DesignAuth],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public viewPassword = signal(false);

  togglePassword() {
    this.viewPassword.update(v => !v);
  }
}

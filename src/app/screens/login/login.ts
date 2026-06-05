import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public senhaVisivel = false;

  togglePassword() {
    this.senhaVisivel = !this.senhaVisivel
  }
}

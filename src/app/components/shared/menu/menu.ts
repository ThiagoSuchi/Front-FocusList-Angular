import { Component, inject } from '@angular/core';
import { MenuLink } from '../menu-link/menu-link';
import { Title } from "../title/title";
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-menu',
  imports: [MenuLink, Title],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  host: {
    class: 'block h-full'
  },
  standalone: true
})
export class Menu {
  public readonly authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}

import { Component } from '@angular/core';
import { MenuLink } from '../menu-link/menu-link';
import { Title } from "../title/title";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-menu',
  imports: [MenuLink, Title, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  host: {
    class: 'block h-full'
  }
})
export class Menu {}

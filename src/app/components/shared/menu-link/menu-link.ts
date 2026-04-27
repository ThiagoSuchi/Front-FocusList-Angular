import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-menu-link',
  imports: [RouterLink],
  templateUrl: './menu-link.html',
  styleUrl: './menu-link.css',
})
export class MenuLink {
  readonly label = input.required<string>();
  readonly route = input.required<string>();
}

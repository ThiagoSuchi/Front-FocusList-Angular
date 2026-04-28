import { Component } from '@angular/core';
import { Menu } from "../menu/menu";

@Component({
  selector: 'app-page',
  imports: [Menu],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {}

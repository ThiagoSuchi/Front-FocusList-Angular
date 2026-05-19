import { Component } from '@angular/core';
import { Title } from "../../components/shared/title/title";

@Component({
  selector: 'app-my-profile',
  imports: [Title],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
  standalone: true
})
export class MyProfile {}

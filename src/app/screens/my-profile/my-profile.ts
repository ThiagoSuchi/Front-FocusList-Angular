import { Component, inject, OnInit } from '@angular/core';
import { Title } from "../../components/shared/title/title";
import { Footer } from '../../components/shared/footer/footer';
import { UserService } from '../../core/services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  imports: [Title, Footer, ReactiveFormsModule],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
  standalone: true
})
export class MyProfile implements OnInit {
  private readonly userService = inject(UserService);

  protected form!: FormGroup;

  ngOnInit(): void {
    this.userService.getUser();
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [this.show()],
      email: [this.show()]
    });
  }
  
  protected show() {
    this.userService.getUser().subscribe(user => {
      this.form.patchValue({
        name: user.name,
        email: user.email
      });
    });
  }
}

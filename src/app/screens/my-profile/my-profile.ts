import { Component, inject, OnInit } from '@angular/core';
import { Title } from "../../components/shared/title/title";
import { Footer } from '../../components/shared/footer/footer';
import { UserService } from '../../core/services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUserProfileDTO } from '../../models/user.model';

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
  protected user: IUserProfileDTO | null = null;

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user

      this.form.patchValue({
        name: user.name,
        email: user.email
      });
    });
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [this.ngOnInit()],
      email: [this.ngOnInit()]
    });
  }  

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    this.userService.uploadProfileImage(file)
      .subscribe({
        next: (res) => {
          this.user!.profileImageUrl = res.profileImageUrl
        } ,
        error: (error) => {
          console.error('Erro ao enviar imagem: ', error);
        }
      })
  }
}

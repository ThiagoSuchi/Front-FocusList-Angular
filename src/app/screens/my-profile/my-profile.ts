import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { Title } from "../../components/shared/title/title";
import { Footer } from '../../components/shared/footer/footer';
import { UserService } from '../../core/services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUserProfileDTO } from '../../models/user.model';
import { SnackBarService } from '../../components/shared/material/snack-bar.service';

@Component({
  selector: 'app-my-profile',
  imports: [Title, Footer, ReactiveFormsModule],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
  standalone: true
})
export class MyProfile implements OnInit {
  private readonly userService = inject(UserService);
  private readonly snackBarService = inject(SnackBarService);

  protected form!: FormGroup;
  protected user = signal<IUserProfileDTO | null>(null);

  public readonly isOpen = signal(false);

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user.set(user);

        this.form.patchValue({
          name: user.name,
          email: user.email
        });
      },
      error: (err) => {
        console.error("Erro ao buscar usuário ", err);
      }
    });
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      email: ['']
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
          this.user.update(currentUser =>
            currentUser
              ? {
                ...currentUser,
                profileImageUrl: res.profileImageUrl
              }
              : currentUser
          );
          this.snackBarService.showSnackBar(res.message, 4000, 'end', 'top');
        },
        error: (err) => {
          this.snackBarService.showSnackBar(err.error.message, 4000, 'end', 'top');
        }
      })
  }

  onCard() {
    this.isOpen.update(value => !value);
    console.log("Funciono");
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.profile-menu-trigger') && !target.closest('.profile-menu')) {
      this.isOpen.set(false);
    }
  }
}

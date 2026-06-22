import { Component, inject, Inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { DesignAuth } from '../../components/shared/design-auth/design-auth';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidationError } from '../../components/shared/validators/validationError';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, DesignAuth, ReactiveFormsModule, ValidationError],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly route = inject(Router);

  public viewPassword = signal(false);

  protected form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  protected submit() {
    if (this.form.invalid) return;

    const dto = this.form.getRawValue();
    
    this.authService.login(dto)
      .pipe()
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.route.navigate(['/home']);
        },
        error: (err) => {
          console.error('Erro ao fazer login: ', err);
        }
      })
  }

  togglePassword() {
    this.viewPassword.update(v => !v);
  }
}

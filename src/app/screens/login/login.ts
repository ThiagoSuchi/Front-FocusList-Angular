import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { DesignAuth } from '../../components/shared/design-auth/design-auth';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidationError } from '../../components/shared/validators/validationError';
import { AuthService } from '../../core/services/auth.service';
import { SnackBarService } from '../../components/shared/material/snack-bar.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterLink, DesignAuth, ReactiveFormsModule, ValidationError],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBarService = inject(SnackBarService);
  private readonly route = inject(ActivatedRoute);

  public name = signal('');

  ngOnInit(): void {
    // Capturar o nome inserido no formulário de cadastro, e imprimir na tela
    const nameParam = this.route.snapshot.queryParamMap.get('name');
    nameParam ? this.name.set(nameParam) : this.name.set(' de Volta')
  }

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
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Erro ao fazer login: ', err);
          this.snackBarService.showSnackBar(err.error.message, 4000, 'end', 'top')
        }
      })
  }

  togglePassword() {
    this.viewPassword.update(v => !v);
  }
}

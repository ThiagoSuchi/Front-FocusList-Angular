import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { DesignAuth } from '../../components/shared/design-auth/design-auth';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  imports: [RouterLink, DesignAuth, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  //
  // fazer DI do LoginService
  //
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

    const {email, password} = this.form.getRawValue();
    //
    // Salvar dados recebidos no banco
    //
  }

  togglePassword() {
    this.viewPassword.update(v => !v);
  }
}

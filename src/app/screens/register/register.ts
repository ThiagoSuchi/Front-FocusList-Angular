import { Component, computed, signal } from '@angular/core';
import { DesignAuth } from '../../components/shared/design-auth/design-auth';
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, type AbstractControl } from '@angular/forms';
import { ValidationError } from '../../components/shared/validators/validationError';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [DesignAuth, RouterLink, JsonPipe, ReactiveFormsModule, ValidationError],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  public readonly viewPassword = signal(false);

  protected form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [null, [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: [null, [
        Validators.required,
        Validators.email 
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
      ]],
      confirmPassword: [null]
    }, { validators: this.passwordMatchValidator })
  }

  // Confirmação de senha, se o input senha for diferente do de confirmação emite um erro
  private passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password != confirmPassword) {
      group.get('confirmPassword')?.setErrors({ passwordMismatch: true })
    } else {
      group.get('confirmPassword')?.setErrors(null);
    }
    return null
  }

  forca = signal(0);

  // Verifica a força da senha inserida
  verificarForca(event: Event) {
    const password = (event.target as HTMLInputElement).value;
    let point = 0;

    if (password.length >= 8) point++;
    if (/[a-z]/.test(password)) point++;
    if (/[A-Z]/.test(password)) point++;
    if (/[@$!%*?&2]/.test(password)) point++;

    // limitando a 4 para não passar da quantidade de barras
    this.forca.set(Math.min(point, 4))
  }

}

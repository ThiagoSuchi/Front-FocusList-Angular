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

}

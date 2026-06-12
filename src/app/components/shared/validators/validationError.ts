import { Component, computed, input } from '@angular/core';
import type { AbstractControl } from '@angular/forms';

interface ErrorMessage {
  key: string;
  message: string;
}

@Component({
  selector: 'app-error-validations',
  imports: [],
  templateUrl: './validationError.html',
  standalone: true
})
export class ValidationError {
  readonly control = input<AbstractControl | null>();
  readonly errors = input<ErrorMessage[]>([]);

  protected isInvalid(): boolean {
    return !!(this.control()?.invalid && this.control()?.touched);
  }

  protected activeErrors(): string[] {
    if (!this.isInvalid) return [];
    
    // filtrei o input pela chave(erro) e retornei a respectiva mensagem de erro
    return this.errors()
      .filter(e => this.control()?.hasError(e.key))
      .map(e => e.message)
  }
}

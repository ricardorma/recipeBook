import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {

  getErrorMessage(errorKey: string): string {
    const messages: { [key: string]: string } = {
      required: 'Este campo es obligatorio',
    };
    return messages[errorKey] ?? 'Error desconocido';
  }

  getControlErrors(control: AbstractControl | null): string[] {
    if (control?.errors) {
      return Object.keys(control.errors).map(key => this.getErrorMessage(key));
    }
    return [];
  }
}

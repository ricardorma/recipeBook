import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';

export function requiredFileType(types: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (file) {
      const extension = file.name.split('.').pop().toLowerCase();
      if (types.indexOf(extension) === -1) {
        return { requiredFileType: true };
      }
    }
    return null;
  };
}

@Directive({
  selector: '[appRequiredFileType]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: RequiredFileTypeDirective, multi: true }]
})
export class RequiredFileTypeDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return requiredFileType(['png', 'jpg', 'jpeg'])(control);
  }
}

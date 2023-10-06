import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(passwordToMatch: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlToMatch = control.root.get(passwordToMatch);

    if (controlToMatch && controlToMatch.value !== control.value) {
      return { passwordMismatch: true };
    }
    return null;
  };
}

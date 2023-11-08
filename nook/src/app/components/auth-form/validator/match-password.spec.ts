import { FormControl, FormGroup } from '@angular/forms';
import { matchPasswordValidator } from './match-password';

describe('matchPasswordValidator', () => {
  it('should return null when passwords match', () => {
    const formGroup = new FormGroup({
      password: new FormControl('12345678'),
      confirmPassword: new FormControl('12345678')
    });

    const validator = matchPasswordValidator('password');
    const result = validator(formGroup.controls['confirmPassword']);
    expect(result).toBeNull();
  });

  it('should handle missing passwordToMatch control', () => {
    const formGroup = new FormGroup({
      password: new FormControl('123456789'),
      confirmPassword: new FormControl('12345678') 
    });
    const validator = matchPasswordValidator('password');
    const result = validator(formGroup.controls['confirmPassword']);
    expect(result).toEqual({ passwordMismatch: true });
  });
});

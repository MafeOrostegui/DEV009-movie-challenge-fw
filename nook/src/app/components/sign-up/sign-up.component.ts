import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    number: new FormControl(''),
  });

  constructor(private authService: AuthService) { }
  requestToken: string | null = null;

  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.getToken()
        .subscribe({
          next: (response: any) => {
            const requestToken = response;
            const redirectTo = `http://localhost:4200/login`
            this.requestToken = requestToken;
            localStorage.setItem('requestToken', requestToken);
            window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectTo}`;
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
    }
  }
}

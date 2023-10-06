import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
  isMobile = window.innerWidth < 611;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 611;
  }

  signUpForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', Validators.required),
  });


  constructor(private authService: AuthService) { }
  requestToken: string | null = null;

  onSubmit() {
    if (this.signUpForm.valid) {
      const password = this.signUpForm.get('password')?.value;
      const confirmPassword = this.signUpForm.get('confirmPassword')?.value;
      if (password === confirmPassword) {
        this.authService.getToken()
          .subscribe({
            next: (response: any) => {
              const requestToken = response;
              const redirectTo = `http://localhost:4200/login`
              const userData = {
                firstName: this.signUpForm.get('firstName')?.value,
                lastName: this.signUpForm.get('lastName')?.value,
                email: this.signUpForm.get('email')?.value,
              };
              this.requestToken = requestToken;
              localStorage.setItem('requestToken', requestToken);
              localStorage.setItem('user_data', JSON.stringify(userData));

              window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectTo}`;
            },
            error: (error) => {
              console.error('Error:', error);
            }
          });
      } else {
        alert('Passwords do not match.');
      }
    }
  }
}

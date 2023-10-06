import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  isMobile = window.innerWidth < 611;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 611;
  }

  hide = true;

  onSubmit() {
    if (this.loginForm.valid) {
      const requestToken = localStorage.getItem('requestToken');
      if (requestToken) {
        this.authService.createSession(requestToken)
          .subscribe({
            next: (response: any) => {
              console.log('Session ID:', response.session_id);
              localStorage.setItem('session_id', response.session_id);
              this.router.navigate(['/home']);
            },
            error: (error) => {
              console.error('Error:', error);
            }
          });
      } else {
        console.error('The requestToken was not found in the localStorage.');
      }
    }
  }
}

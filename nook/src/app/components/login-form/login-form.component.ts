import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const requestToken = localStorage.getItem('requestToken');
    if (requestToken) {
      this.authService.createSession(requestToken)
        .subscribe({
          next: (response: any) => {
            console.log('Session ID:', response.session_id);
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
    } else {
      console.error('The requestToken was not found in the localStorage.');
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const sessionId = this.authService.getSessionId();
      if (sessionId) {
        console.log('Logging in with Session ID:', sessionId);
        this.router.navigate(['/home']);
      } else {
        console.error('Session ID not found.');
      }
    }
  }
}

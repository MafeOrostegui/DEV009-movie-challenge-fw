import { Component, Input } from '@angular/core';
import { authService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out-button',
  templateUrl: './sign-out-button.component.html',
})
export class SignOutButtonComponent {
  @Input() styleProfile: boolean = false;

  constructor(private userService : authService, private router: Router) {
  }

  onClick() {
    this.userService.logOut()
      .then(() => {
        this.router.navigate(['/landing-page'])
      })
      .catch((error) => console.log(error))
  }
}

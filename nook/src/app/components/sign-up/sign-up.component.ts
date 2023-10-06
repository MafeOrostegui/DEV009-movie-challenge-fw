import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { matchPasswordValidator } from 'src/app/directives/match-password-directive.directive';

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

  signUpForm: FormGroup;

  constructor(
    private userService: FirestoreService,
    private router: Router
  ) {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [
        Validators.required,
        matchPasswordValidator('password')
      ]),
    });
  }

  onSubmit() {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    this.userService.register(email, password)
      .then(response => {
        console.log(response)
        this.router.navigate(['/login'])
      })
      .catch(error => console.log(error))
  }
}

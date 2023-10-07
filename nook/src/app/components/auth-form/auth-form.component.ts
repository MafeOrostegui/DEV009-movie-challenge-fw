import { Component, Input, OnInit, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPasswordValidator } from 'src/app/directives/match-password-directive.directive';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { authService } from 'src/app/services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';

const actionType = {
  signIn: {
    action: 'signIn',
    title: 'Sign In',
  },
  signUp: {
    action: 'signUp',
    title: 'Sign Up',
  },
} as const;

type ActionType = keyof typeof actionType;

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    MatIconModule,
  ],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {

  constructor(
    private authSvc: authService,
    private fb: FormBuilder
  ) { }
  
  @Input() action!: ActionType;
  form!: FormGroup;
  title!: string;
  titleButton!: string;

  isMobile = window.innerWidth < 611;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 611;
  }

  hide = true;
  private readonly emailPattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit(): void {
    this.titleButton =
      this.action === actionType.signIn.action
        ? actionType.signIn.title
        : actionType.signUp.title;
    this.title =
        this.action === actionType.signIn.action
        ? 'Login'
        : 'Create Account'

    this.initForm();
  }

  hasError(field: string): boolean {
    const fieldName = this.form.get(field);
    return !!fieldName?.invalid && fieldName.touched;
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    this.action === actionType.signIn.action ?
      this.authSvc.login(email, password) : this.authSvc.register(email, password);
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required,
      matchPasswordValidator('password')]]
    });
  }
}

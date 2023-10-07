import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `<app-auth-form [action]="'signIn'" />`,
})
export class LoginComponent {}

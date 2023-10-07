import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { loginRoutingModule } from './login.routing.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule, loginRoutingModule, AuthFormComponent],
  })
  export class SignInModule {}
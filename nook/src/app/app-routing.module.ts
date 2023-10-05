import { NgModule, HostListener } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LandingPageDesktopComponent } from './components/landing-page-desktop/landing-page-desktop.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: "landing-page", component: LandingPageComponent },
  { path: "landing-page-desktop", component: LandingPageDesktopComponent },
  { path: "login", component: LoginFormComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "home", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  constructor(private router: Router) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth >= 611) {
      this.router.navigate(['/landing-page-desktop']);
    }
  }
}

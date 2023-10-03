import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LandingPageDesktopComponent } from './components/landing-page-desktop/landing-page-desktop.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: "landing-page", component: LandingPageComponent },
  { path: "landing-page-desktop", component: LandingPageDesktopComponent },
  { path: "login", component: LoginComponent },
  { path: "sign-up", component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    if (window.innerWidth >= 611) {
      this.router.navigate(['/landing-page-desktop']);
    }
  }
}

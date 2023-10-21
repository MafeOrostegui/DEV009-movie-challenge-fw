import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { MovieInfoComponent } from './pages/movie-info/movie-info.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LibraryComponent } from './pages/library/library.component';
import { SearchMoviesComponent } from './pages/search-movies/search-movies.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: "landing-page", component: LandingPageComponent },
  { path: "login", component: LoginComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "home", component: HomeComponent },
  { path: "profile", component: ProfileComponent },
  { path: "library", component: LibraryComponent },
  { path: "search", component: SearchMoviesComponent },
  { path: "email-verification", component: EmailVerificationComponent },
  { path: "movie/:id", component: MovieInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

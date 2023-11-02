import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { MediaInfoComponent } from './pages/media-info/media-info.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LibraryComponent } from './pages/library/library.component';
import { SearchMoviesComponent } from './pages/search-movies/search-movies.component';
import { TvShowsComponent } from './pages/tv-shows/tv-shows.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { onlyLoggedInGuard } from './guard/only-logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  { path: "landing-page", component: LandingPageComponent },
  { path: "login", component: LoginComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "home", component: HomeComponent, canActivate: [onlyLoggedInGuard] },
  { path: "tvShows", component: TvShowsComponent, canActivate: [onlyLoggedInGuard] },
  { path: "movies", component: MoviesComponent, canActivate: [onlyLoggedInGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [onlyLoggedInGuard] },
  { path: "library", component: LibraryComponent, canActivate: [onlyLoggedInGuard] },
  { path: "search/:id/:categoryName", component: SearchMoviesComponent, canActivate: [onlyLoggedInGuard] },
  { path: "search", component: SearchMoviesComponent, canActivate: [onlyLoggedInGuard] },
  { path: "email-verification", component: EmailVerificationComponent, canActivate: [onlyLoggedInGuard] },
  { path: "info/:id/:media", component: MediaInfoComponent, canActivate: [onlyLoggedInGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

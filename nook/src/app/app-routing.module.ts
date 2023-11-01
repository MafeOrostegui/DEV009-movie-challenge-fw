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

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: "login", component: LoginComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "home", component: HomeComponent },
  { path: "tvShows", component: TvShowsComponent },
  { path: "movies", component: MoviesComponent },
  { path: "profile", component: ProfileComponent },
  { path: "library", component: LibraryComponent },
  { path: "search/:id/:categoryName", component: SearchMoviesComponent },
  { path: "search", component: SearchMoviesComponent },
  { path: "email-verification", component: EmailVerificationComponent },
  { path: "info/:id/:media", component: MediaInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { HeaderComponent } from './components/header/header.component';
import { MoviesCardsComponent } from './components/movies-cards/movies-cards.component';
import { MenuComponent } from './components/menu/menu.component';
import { MovieInfoComponent } from './pages/movie-info/movie-info.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserDropdownMenuComponent } from './components/user-dropdown-menu/user-dropdown-menu.component';
import { SignOutButtonComponent } from './components/sign-out-button/sign-out-button.component';
import { LibraryComponent } from './pages/library/library.component';
import { AddToListButtonComponent } from './components/add-to-list-button/add-to-list-button.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LikeButtonComponent } from './components/like-button/like-button.component';
import { SearchMoviesComponent } from './pages/search-movies/search-movies.component';
import { CategoryCardsComponent } from './components/category-cards/category-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    EmailVerificationComponent,
    HeaderComponent,
    MoviesCardsComponent,
    MenuComponent,
    MovieInfoComponent,
    MovieCardComponent,
    NavBarComponent,
    BackButtonComponent,
    ProfileComponent,
    UserDropdownMenuComponent,
    SignOutButtonComponent,
    LibraryComponent,
    AddToListButtonComponent,
    SearchBarComponent,
    LikeButtonComponent,
    SearchMoviesComponent,
    CategoryCardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    AuthFormComponent,
    ErrorMessageComponent,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

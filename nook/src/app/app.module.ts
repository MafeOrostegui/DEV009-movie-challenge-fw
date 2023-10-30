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
import { MediaCardsComponent } from './components/media-cards/media-cards.component';
import { MenuComponent } from './components/menu/menu.component';
import { MediaInfoComponent } from './pages/media-info/media-info.component';
import { MediaCardComponent } from './components/media-card/media-card.component';
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
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CategoryResultsComponent } from './components/category-results/category-results.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselComponent } from './components/carousel/carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TvShowsComponent } from './pages/tv-shows/tv-shows.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    EmailVerificationComponent,
    HeaderComponent,
    MediaCardsComponent,
    MenuComponent,
    MediaInfoComponent,
    MediaCardComponent,
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
    SearchResultsComponent,
    CategoryResultsComponent,
    CarouselComponent,
    TvShowsComponent,
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
    CarouselModule,
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

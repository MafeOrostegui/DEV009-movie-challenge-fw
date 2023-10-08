import { Component } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { authService } from 'src/app/services/auth/auth.service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { Router } from '@angular/router';
import { MoviesComponent } from 'src/app/components/movies/movies.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  popularMovies: any[] = [];

  constructor(
    private userService: authService,
    private router: Router) { }

  onClick() {
    this.userService.logOut()
      .then(() => {
        this.router.navigate(['/landing-page'])
      })
      .catch((error) => console.log(error))
  }
}

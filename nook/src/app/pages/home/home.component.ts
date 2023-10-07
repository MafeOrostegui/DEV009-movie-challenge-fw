import { Component } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { authService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  popularMovies: any[] = [];

  constructor(private moviesService: MoviesService,
    private userService: authService,
    private router: Router) { }

  ngOnInit(): void {
    this.moviesService.getPopularMovies()
      .subscribe(
        (response: any): void => {
          this.popularMovies = response.results;
        }
      );
  }

  onClick() {
    this.userService.logOut()
      .then(() => {
        this.router.navigate(['/landing-page'])
      })
      .catch((error)=> console.log(error))
  }
}

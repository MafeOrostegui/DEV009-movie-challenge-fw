import { Component } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-landing-page-desktop',
  templateUrl: './landing-page-desktop.component.html',
  styleUrls: ['./landing-page-desktop.component.scss']
})
export class LandingPageDesktopComponent {

  popularMovies: any[] = [];
  upcomingMovies: any[] = [];
  currentMovieIndex: number = 0;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getPopularMovies()
      .subscribe(
        (response: any): void => {
          this.popularMovies = response.results;
          console.log(this.popularMovies);
        }
      );
  }
}

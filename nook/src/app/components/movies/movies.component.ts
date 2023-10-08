import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  constructor(private moviesService: MoviesService) { }

  @Input() movieType!: 'popular' | 'upcoming';
  @Input() customClasses: string = '';

  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  currentMovieIndex: number = 0;

  onMouseEnter(movie: any) {
    movie.isHovered = true;
  }

  onMouseLeave(movie: any) {
    movie.isHovered = false;
  }

  getMovies(): Movie[] {
    if (this.movieType === 'popular') {
      return this.popularMovies;
    } else if (this.movieType === 'upcoming') {
      return this.upcomingMovies;
    } else {
      return [];
    }
  }

  ngOnInit(): void {
    if (this.movieType === 'popular') {
      this.moviesService.getPopularMovies().subscribe(
        (response: any): void => {
          this.popularMovies = response.results as Movie[];
          console.log(this.popularMovies);
        }
      );
    } else if (this.movieType === 'upcoming') {
      this.moviesService.getUpcomingMovies().subscribe(
        (response: any): void => {
          this.upcomingMovies = response.results as Movie[];
          console.log(this.upcomingMovies);
        }
      );
    }
  }
}

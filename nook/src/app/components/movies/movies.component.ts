import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  constructor(private moviesService: MoviesService) { }

  @Input() movieType!: 'popular' | 'upcoming' | 'topRated';
  @Input() useSlider: boolean = false;

  movies: Movie[] = [];

  onMouseEnter(movie: any) {
    movie.isHovered = true;
  }

  onMouseLeave(movie: any) {
    movie.isHovered = false;
  }

  ngOnInit(): void {
    const serviceMap: { [key: string]: () => void } = {
      popular: this.getPopularMovies,
      upcoming: this.getUpcomingMovies,
      topRated: this.getTopRatedMovies,
    };

    const selectedService = serviceMap[this.movieType];

    if (selectedService) {
      selectedService.call(this);
    }
  }

  private getPopularMovies(): void {
    this.moviesService.getPopularMovies().subscribe((response: any) => {
      this.movies = response.results as Movie[];
      console.log(this.movies);
    });
  }

  private getUpcomingMovies(): void {
    this.moviesService.getUpcomingMovies().subscribe((response: any) => {
      this.movies = response.results as Movie[];
      console.log(this.movies);
    });
  }

  private getTopRatedMovies(): void {
    this.moviesService.getTopRatedMovies().subscribe((response: any) => {
      this.movies = response.results as Movie[];
      console.log(this.movies);
    });
  }
}


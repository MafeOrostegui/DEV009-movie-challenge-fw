import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies-cards.component.html',
})
export class MoviesCardsComponent implements OnInit {
  constructor(private moviesService: MoviesService) { }

  @Input() movieType!: 'popular' | 'upcoming' | 'top_rated';
  @Input() genre?: number;
  @Input() useScrollX: boolean = false;

  movies: Movie[] = [];

  ngOnInit(): void {
    this.getMovies();
  }

  private getMovies(): void {
    this.moviesService.getMovies(this.movieType, 1, this.genre).subscribe((response: any) => {
      this.movies = response.results as Movie[];
    })
  }
}

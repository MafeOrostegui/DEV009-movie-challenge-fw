import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies-cards.component.html',
})
export class MoviesCardsComponent implements OnInit {
  
  constructor(
    private moviesService: MoviesService,
    private firestoreService: FirestoreService
  ) { }

  defaultMessage: string = "There are no movies in this category.";
  @Input() movieType!: 'popular' | 'upcoming' | 'top_rated' | 'movies' | 'favorites';
  @Input() genre?: number;
  @Input() useScrollX: boolean = true;

  movies: Movie[] = [];

  ngOnInit(): void {
    this.getMovies();
  }

  private getMovies(): void {
    this.movieType === 'movies' || this.movieType === 'favorites' 
    ? this.getMoviesFromFirestore() 
    : this.getMoviesFromService();
  }

  private getMoviesFromFirestore(): void {
    this.firestoreService.getMovies(this.movieType).subscribe((moviesData) => {
      this.movies = moviesData;
    });
  }

  private getMoviesFromService(): void {
    this.moviesService
      .getMovies( 1, this.movieType, this.genre)
      .subscribe((response) => {
        this.movies = response.results as Movie[];
      });
  }
}

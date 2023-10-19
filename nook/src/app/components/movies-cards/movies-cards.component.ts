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

  @Input() movieType!: 'popular' | 'upcoming' | 'top_rated' | 'list';
  @Input() genre?: number;
  @Input() useScrollX: boolean = false;

  movies: Movie[] = [];

  ngOnInit(): void {
    this.getMovies();
  }

  private getMovies(): void {
    this.movieType === 'list' 
    ? this.getMoviesFromFirestore() 
    : this.getMoviesFromService();
  }

  private getMoviesFromFirestore(): void {
    this.firestoreService.getMovies().subscribe((moviesData) => {
      this.movies = moviesData;
    });
  }

  private getMoviesFromService(): void {
    this.moviesService
      .getMovies(this.movieType, 1, this.genre)
      .subscribe((response) => {
        this.movies = response.results as Movie[];
      });
  }
}

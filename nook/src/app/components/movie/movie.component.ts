import { Component, Input, OnInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Movie } from 'src/app/models/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
})
export class MovieComponent implements OnInit, OnChanges {
  constructor(private moviesService: MoviesService, private router: Router) { 
    this.isMobile = window.innerWidth < 640;
  }

  @Input() movieId!: number;
  movie: Movie = {} as Movie;

  isHome(): boolean {
    return this.router.url === '/home';
  }

  isMobile: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 640;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movieId'] && !changes['movieId'].firstChange) {
      this.loadMovieInfo(this.movieId);
    }
  }

  ngOnInit() {
    this.loadMovieInfo(this.movieId);
  }

  loadMovieInfo(id: number): void {
    this.moviesService.getMovieInfo(id)
      .subscribe((response) => {
        this.movie = response;
        console.log(this.movie);
      });
  }
}

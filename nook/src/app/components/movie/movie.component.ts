import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  constructor(private moviesService: MoviesService) { }
  @Input() movieId!: number;
  movie: Movie = {} as Movie;
  
  ngOnInit() {
    this.moviesService.getMovieInfo(this.movieId)
    .subscribe(
      (response) => {
        this.movie = response;
        console.log(this.movie)
      })
  }
}

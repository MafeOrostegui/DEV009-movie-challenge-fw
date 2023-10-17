import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html'
})
export class MovieInfoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private moviesService: MoviesService) { }

  movie: Movie = {} as Movie;

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        this.movie.id = params['id'];
        return this.moviesService.getMovieInfo(this.movie.id);
      })
    ).subscribe(
      (response) => {
        this.movie = response;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MediaService } from 'src/app/services/media/media.service';
import { switchMap } from 'rxjs/operators';
import { TvShow } from 'src/app/models/tv-show';

@Component({
  selector: 'app-media-info',
  templateUrl: './media-info.component.html'
})
export class MediaInfoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private moviesService: MediaService) { }

  movie: Movie = {} as Movie;
  TvShow: TvShow = {} as TvShow;
  media!: string;

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        this.media=params['media']
        this.media === 'tv'
        ? this.TvShow = params['id']
        : this.movie.id = params['id'];
        return this.moviesService.getMediaInfo(this.movie.id, this.media);
      })
    ).subscribe(
      (response) => {
        this.movie = response;
      });
  }
}

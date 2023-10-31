import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { TvShow } from 'src/app/models/tv-show';
import { MediaService } from 'src/app/services/media/media.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs'; 

@Component({
  selector: 'app-media-info',
  templateUrl: './media-info.component.html'
})
export class MediaInfoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private mediaService: MediaService) { }

  movie: Movie = {} as Movie;
  tvShow: TvShow = {} as TvShow;
  seasonInfo: any;
  media!: 'tv' | 'movie';

  handleSeasonInfoSelected(seasonInfo: any) {
    this.seasonInfo = seasonInfo;
    console.log(this.seasonInfo)
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        this.media = params['media'];
        if (this.media === 'movie') {
          this.movie.id = params['id'];
          return this.mediaService.getMediaInfo(this.movie.id, this.media);
        } else if (this.media === 'tv') {
          this.tvShow.id = params['id'];
          return this.mediaService.getMediaInfo(this.tvShow.id, this.media);
        } else {
          return of(null); 
        }
      })
    ).subscribe(
      (response) => {
        if (this.media === 'movie') {
          this.movie = response;
        } else if (this.media === 'tv') {
          this.tvShow = response;
        }
      });
  }
}

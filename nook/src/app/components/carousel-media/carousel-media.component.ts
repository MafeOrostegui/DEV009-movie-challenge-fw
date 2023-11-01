import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Movie } from 'src/app/models/movie';
import { TvShow } from 'src/app/models/tv-show';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-carousel-media',
  templateUrl: './carousel-media.component.html',
})
export class CarouselMediaComponent implements OnInit {
  constructor(private mediaService: MediaService) { }

  @Input() mediaSubtype!: 'popular' | 'upcoming' | 'top_rated' | 'on_the_air' | 'now_playing';
  @Input() genre?: number;
  @Input() mediaType?: 'movie' | 'tv';

  movies: Movie[] = [];
  tvShows: TvShow[] = [];

  ngOnInit(): void {
    this.getMediaFromService();
  }

  private getMediaFromService(): void {
    this.mediaService
      .getMedia(1, this.mediaType, this.mediaSubtype, this.genre)
      .subscribe((response) => {
        if (this.mediaType === 'movie') {
          this.movies = (response.results as Movie[])
          this.movies = this.movies.slice(0, 6);
          this.loadMovieInfoForMovies();
        } else {
          this.tvShows = (response.results as TvShow[])
          this.tvShows = this.tvShows.slice(0, 6);
          this.loadMovieInfoForTvShows();
        }
      });
  }

  private loadMovieInfoForMovies(): void {
    for (const movie of this.movies) {
      this.loadMediaInfo(movie.id, 'movie');
    }
  }

  private loadMovieInfoForTvShows(): void {
    for (const tvShow of this.tvShows) {
      this.loadMediaInfo(tvShow.id, 'tv');
    }
  }

  private loadMediaInfo(id: number, mediaType: string): void {
    this.mediaService.getMediaInfo(id, mediaType)
      .subscribe((response) => {
        if (mediaType === 'movie') {
          const movie = this.movies.find(movie => movie.id === id);
          if (movie) {
            Object.assign(movie, response);
          }
        } else if (mediaType === 'tv') {
          const tvShow = this.tvShows.find(tvShow => tvShow.id === id);
          if (tvShow) {
            Object.assign(tvShow, response);
          }
        }
      });
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoHeight: false,
    autoWidth: false,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      760: {
        items: 1,
      },
    },
  };
}

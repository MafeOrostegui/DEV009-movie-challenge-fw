import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Movie } from 'src/app/models/movie';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-carousel-media',
  templateUrl: './carousel-media.component.html',
})
export class CarouselMediaComponent implements OnInit {
  constructor(private mediaService: MediaService) { }

  @Input() mediaSubtype!: 'popular' | 'upcoming' | 'top_rated'| 'on_the_air' | 'now_playing';
  movies: Movie[] = [];
  @Input() mediaType?: 'movie';

  ngOnInit(): void {
    this.getMediaFromService();
  }

  private getMediaFromService(): void {
    this.mediaService
      .getMedia(1, this.mediaType, this.mediaSubtype, undefined)
      .subscribe((response) => {
        this.movies = (response.results as Movie[])
        this.movies = this.movies.slice(0, 6);
        this.loadMovieInfoForMovies();
      });
  }

  private loadMovieInfoForMovies(): void {
    for (const movie of this.movies) {
      this.loadMovieInfo(movie.id);
    }
  }

  private loadMovieInfo(id: number): void {
    this.mediaService.getMediaInfo(id, this.mediaType)
      .subscribe((response) => {
        const movie = this.movies.find(movie => movie.id === id);
        if (movie) {
          Object.assign(movie, response);
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

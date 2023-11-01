import { Component, Input, OnInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { MediaService } from 'src/app/services/media/media.service';
import { Movie } from 'src/app/models/movie';
import { TvShow } from 'src/app/models/tv-show';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './media-card.component.html',
})
export class MediaCardComponent implements OnInit, OnChanges {
  
  constructor(private moviesService: MediaService, private router: Router) {
    this.isMobile = window.innerWidth < 640;
  }

  @Input() movieId!: number;
  @Input() mediaType?: 'tv' | 'movie';
  movie: Movie = {} as Movie;
  tvShow: TvShow = {} as TvShow;

  isHome(): boolean {
    return this.router.url === '/home' || this.router.url === '/tvShows' || this.router.url === '/movies';
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
    this.moviesService.getMediaInfo(id, this.mediaType)
      .subscribe((response) => {
        (this.mediaType === 'movie')
        ? this.movie = response
        : this.tvShow = response;
      });
  }
}

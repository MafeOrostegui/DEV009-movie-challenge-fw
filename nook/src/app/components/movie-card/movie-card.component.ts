import { Component, Input, OnInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { MediaService } from 'src/app/services/media/media.service';
import { Movie } from 'src/app/models/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent implements OnInit, OnChanges {
  
  constructor(private moviesService: MediaService, private router: Router) {
    this.isMobile = window.innerWidth < 640;
  }

  @Input() movieId!: number;
  @Input() mediaType?: 'tv' | 'movie';
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
    this.moviesService.getMediaInfo(id, this.mediaType)
      .subscribe((response) => {
        this.movie = response;
      });
  }
}

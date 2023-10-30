import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from 'src/app/services/media/media.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Movie } from 'src/app/models/movie';
import { TvShow } from 'src/app/models/tv-show';

@Component({
  selector: 'app-cards',
  templateUrl: './media-cards.component.html',
})
export class MediaCardsComponent implements OnInit {

  constructor(
    private mediaService: MediaService,
    private firestoreService: FirestoreService
  ) { }

  defaultMessage: string = "There are no movies in this category";
  @Input() movieType!: 'popular' | 'upcoming' | 'top_rated' | 'movies' | 'favorites';
  @Input() mediaType?: 'tv' | 'movie';
  @Input() genre?: number;
  @Input() useScrollX: boolean = true;

  movies: Movie[] = [];
  tvShows: TvShow[] = [];

  ngOnInit(): void {
    this.getMedia();
  }

  hasMediaData(): boolean {
    return (this.mediaType === 'movie' && this.movies.length > 0) ||
      (this.mediaType === 'tv' && this.tvShows.length > 0);
  }

  getMediaList(): (Movie | TvShow)[] {
    return this.mediaType === 'movie' ? this.movies : this.tvShows;
  }

  getMediaType(): string {
    return this.mediaType === 'movie' ? 'movie' : 'tv';
  }

  getMediaAlt(media: Movie | TvShow): string {
    if (this.mediaType === 'movie' && 'title' in media) {
      return media.title;
    } else if (this.mediaType === 'tv' && 'name' in media) {
      return media.name;
    } else {
      return 'No Title/Name Available';
    }
  }
  
  private getMedia(): void {
    this.movieType === 'movies' || this.movieType === 'favorites'
      ? this.getMoviesFromFirestore()
      : this.getMediaFromService();
  }

  private getMoviesFromFirestore(): void {
    this.firestoreService.getMovies(this.movieType).subscribe((moviesData) => {
      this.movies = moviesData;
    });
  }

  private getMediaFromService(): void {
    this.mediaService
      .getMedia(1, this.mediaType, this.movieType, this.genre)
      .subscribe((response) => {
        (this.mediaType === 'movie')
        ? this.movies = response.results as Movie[]
        : this.tvShows = response.results as TvShow[];
      });
  }
}

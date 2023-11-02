import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Results } from 'src/app/models/results';
import { Movie } from 'src/app/models/movie';
import { TvShow } from 'src/app/models/tv-show';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
})
export class SearchResultsComponent {
  @Input() searchResults: Results | null | undefined;
  @Output() scrolled = new EventEmitter<void>();
  scrollUpDistance: number = 0.1;

  onScrollSearch() {
    this.scrolled.emit();
  }

  isTvShow(result: Movie | TvShow): boolean {
    return 'media_type' in result && result.media_type === 'tv';
  }  

  getTitle(result: Movie | TvShow): string {
    if ('title' in result) {
      return result.title;
    } else if ('name' in result) {
      return result.name;
    } else {
      return 'Unknown Title';
    }
  }
}

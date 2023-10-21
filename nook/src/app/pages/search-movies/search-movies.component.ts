import { Component } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
})
export class SearchMoviesComponent {
  constructor(private movieService: MoviesService) {}

  searchResults: any;

  handleSearchResults(results: any) {
    this.searchResults = results;
    console.log(results)
  }
}

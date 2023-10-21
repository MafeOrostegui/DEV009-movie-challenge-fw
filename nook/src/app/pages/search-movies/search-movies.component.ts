import { Component } from '@angular/core';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
})
export class SearchMoviesComponent {
  constructor() { }

  searchResults: any;

  handleSearchResults(results: any) {
    this.searchResults = results;
    console.log(results)
  }
}

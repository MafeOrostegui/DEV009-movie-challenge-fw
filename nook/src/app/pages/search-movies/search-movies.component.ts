import { Component } from '@angular/core';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
})
export class SearchMoviesComponent {
  constructor() { }

  searchResults: any;
  categorySelected?:number;

  handleSearchResults(results: any) {
    this.searchResults = results;
  }

  handleCategorySelected(categoryId:number){
    this.categorySelected = categoryId;
    console.log(this.categorySelected)
  }

  clearSearch() {
    this.searchResults = null;
  }
}

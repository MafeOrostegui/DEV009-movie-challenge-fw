import { Injectable } from '@angular/core';
import { Results } from 'src/app/models/results';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {

  constructor() { }

  private searchResults?: Results;
  private searchTerm: string | null = null;

  setSearchResults(results: Results) {
    this.searchResults = results;
  }

  getSearchResults() {
    return this.searchResults;
  }

  setSearchTerm(term: string) {
    this.searchTerm = term;
  }

  getSearchTerm(): string | null {
    return this.searchTerm
  }
}

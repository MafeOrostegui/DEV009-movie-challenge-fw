import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {

  constructor() { }

  private searchResults: any;
  private searchTerm: string | null = null;

  setSearchResults(results: any) {
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

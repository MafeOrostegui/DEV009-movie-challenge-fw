import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MediaService } from 'src/app/services/media/media.service';
import { SearchStateService } from 'src/app/services/search-state/search-state.service';
import { Results } from 'src/app/models/results';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnInit {
  constructor(
    private movieService: MediaService,
    private fb: FormBuilder,
    private searchStateService: SearchStateService
  ) {
    this.initForm();
  }

  form!: FormGroup;
  @Output() searchResults = new EventEmitter<Results>();
  @Output() clearSearchEvent = new EventEmitter<void>();
  private currentResults: Results = { results: [] };

  ngOnInit() {
    const searchResults = this.searchStateService.getSearchTerm();
    if (searchResults) {
      this.form.get('inputSearch')?.setValue(searchResults);
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      inputSearch: [''],
      currentPage: 1,
    });
  }

  onSearchInputChange(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
  
    if (query.length >= 3) {
      const currentPage = this.form.get('currentPage')?.value; 
      this.search(query, currentPage);
    } else if (query.length === 0) {
      this.clearSearch();
    }
  }
  
  search(query: string, currentPage: number) {
    this.movieService.searchMovies(query, currentPage).subscribe((response) => {
      this.searchResults.emit(response);
      this.searchStateService.setSearchTerm(query);
      this.form.get('currentPage')?.setValue(currentPage);
    });
  }

  fetchMoreResults() {
    const currentPage = this.form.get('currentPage')?.value + 1;
    this.form.get('currentPage')?.setValue(currentPage);

    const query = this.form.get('inputSearch')?.value;

    this.movieService.searchMovies(query, currentPage).subscribe((response) => {
      if (response) {
        this.currentResults.results = this.currentResults.results.concat(response.results);
        this.searchResults.emit(this.currentResults);
      }
    });
  }

  clearSearch(): void {
    this.form?.get('inputSearch')?.setValue('');
    this.searchStateService.setSearchTerm('');
    this.clearSearchEvent.emit();
  }
}

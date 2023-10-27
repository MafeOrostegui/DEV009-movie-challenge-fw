import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { SearchStateService } from 'src/app/services/search-state/search-state.service';
import { Results } from 'src/app/models/results';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnInit {
  constructor(
    private movieService: MoviesService,
    private fb: FormBuilder,
    private searchStateService: SearchStateService
  ) {
    this.initForm();
  }

  form!: FormGroup;
  @Output() searchResults = new EventEmitter<Results>();
  @Output() clearSearchEvent = new EventEmitter<void>();

  ngOnInit() {
    const searchResults = this.searchStateService.getSearchTerm();
    if (searchResults) {
      this.form.get('inputSearch')?.setValue(searchResults);
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      inputSearch: [''],
    });
  }

  onSearchInputChange(event: Event): void {
    const query = (event.target as HTMLInputElement).value;

    if (query.length >= 3) {
      this.movieService.searchMovies(query).subscribe((response) => {
        this.searchResults.emit(response);
        this.searchStateService.setSearchTerm(query);
      });
    } else if (query.length === 0) {
      this.clearSearch();
    }
  }

  clearSearch(): void {
    this.form?.get('inputSearch')?.setValue('');
    this.clearSearchEvent.emit();
    this.searchStateService.setSearchTerm('');
  }
}

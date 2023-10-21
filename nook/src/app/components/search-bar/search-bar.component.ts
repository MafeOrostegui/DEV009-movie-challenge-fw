import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  constructor(private movieService: MoviesService, private fb: FormBuilder) {
    this.initForm();
  }

  form!: FormGroup;
  @Output() searchResults = new EventEmitter<any>();
  @Output() clearSearchEvent = new EventEmitter<void>();

  private initForm(): void {
    this.form = this.fb.group({
      inputSearch: ['']
    });
  }

  onSearchInputChange(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.form.get('inputSearch')?.setValue(query); 

    if (query.length >= 3) {
      this.movieService.searchMovies(query).subscribe(response => this.searchResults.emit(response));
    } else if (query.length === 0) {
      this.clearSearch();
    }
  }

  clearSearch(): void {
    this.form?.get('inputSearch')?.setValue('');
    this.clearSearchEvent.emit();
  }
}

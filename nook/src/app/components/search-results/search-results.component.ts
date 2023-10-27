import { Component, Input } from '@angular/core';
import { Results } from 'src/app/models/results';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
})
export class SearchResultsComponent {
  @Input() searchResults: Results | null | undefined;
}

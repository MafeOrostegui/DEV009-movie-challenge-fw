import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-category-results',
  templateUrl: './category-results.component.html',
})
export class CategoryResultsComponent {
  @Input() categoryName?: string;
  @Input() movies?: any[];
}

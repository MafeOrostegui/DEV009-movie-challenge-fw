import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-category-results',
  templateUrl: './category-results.component.html',
})
export class CategoryResultsComponent {
  @Input() categoryName?: string;
  @Input() movies: Movie[] = [];
  @Output() scrolled = new EventEmitter<void>();

  scrollUpDistance: number = 1;

  onScroll() {
    this.scrolled.emit();
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { CategoryMovie } from 'src/app/models/category-movie';
import { Movie } from 'src/app/models/movie';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-category-cards',
  templateUrl: './category-cards.component.html',
})
export class CategoryCardsComponent implements OnInit {
  constructor(
    private moviesService: MoviesService,
    private dataService: DataService
  ) { }

  menuCategoryMovies: CategoryMovie[] = [];
  selectedCategory: number | null = null;

  @Output() categorySelected = new EventEmitter<{ id: number, name: string }>();
  @Input() links: boolean = false;
  @Input() genre?: number;
  movie: Movie = {} as Movie;

  ngOnInit() {
    this.categoryMovies();
  }

  categoryMovies() {
    this.moviesService.getCategoryMovies().subscribe((response: { genres: CategoryMovie[] }) => {
      this.menuCategoryMovies = response.genres;
      this.menuCategoryMovies.forEach((category) => {
        this.dataService.getGenreImageById(category.id).subscribe((url) => {
          category.image = url;
        });
      });
    });
  }

  onCategorySelected(categoryId: number, categoryName: string) {
    const categoryInfo = { id: categoryId, name: categoryName };
    this.categorySelected.emit(categoryInfo);
    this.selectedCategory = categoryId;
  }  
}

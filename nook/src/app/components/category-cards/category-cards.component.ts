import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { CategoryMovie } from 'src/app/models/category-movie';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-category-cards',
  templateUrl: './category-cards.component.html',
})
export class CategoryCardsComponent implements OnInit {
  constructor(private moviesService: MoviesService) { }
  menuCategoryMovies: CategoryMovie[] = [];
  
  @Output() categorySelected =  new EventEmitter<number>();
  @Input() links: boolean = false;
  @Input() genre?: number;
  movie: Movie = {} as Movie;

  ngOnInit() {
    this.categoryMovies();
  }

  categoryMovies() {
    this.moviesService.getCategoryMovies()
      .subscribe((response: { genres: CategoryMovie[] }) => {
        this.menuCategoryMovies = response.genres;
      });
  }

  onCategorySelected(categoryId: number) {
    this.categorySelected.emit(categoryId);
  }
}

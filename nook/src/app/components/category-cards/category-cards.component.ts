import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { CategoryMovie } from 'src/app/models/category-movie';

@Component({
  selector: 'app-category-cards',
  templateUrl: './category-cards.component.html',
})
export class CategoryCardsComponent implements OnInit {
  constructor(private moviesService: MoviesService){}
  menuCategoryMovies: CategoryMovie[] = [];

  ngOnInit() {
    this.categoryMovies();
  }

  categoryMovies() {
    this.moviesService.getCategoryMovies()
      .subscribe((response: { genres: CategoryMovie[] }) => {
        this.menuCategoryMovies = response.genres;
      });
  }

}

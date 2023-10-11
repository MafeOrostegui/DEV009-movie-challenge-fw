import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { CategoryMovie } from 'src/app/models/category-movie';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit{
  constructor(private moviesService: MoviesService) { }

  menuOpen = false;
  genreMenuOpen = false;
  inCategoryMenu = false;
  menuCategoryMovies: CategoryMovie[] = [];

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.inCategoryMenu = false;
  }

  toggleGenreMenu() {
    this.genreMenuOpen = !this.genreMenuOpen;
    if (this.genreMenuOpen) {
      this.inCategoryMenu = true;
    }
  }

  goBackToMenu() {
    this.genreMenuOpen = false;
    this.inCategoryMenu = false;
  }

  ngOnInit() {
    this.categoryMovies();
  }

  categoryMovies() {
    this.moviesService.getCategoryMovies()
    .subscribe(
      (response: { genres: CategoryMovie[] }): void => {
        this.menuCategoryMovies = response.genres;
        console.log(this.menuCategoryMovies)
      }
    );
  }
}

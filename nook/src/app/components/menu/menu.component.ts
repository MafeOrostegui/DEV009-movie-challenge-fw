import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { CategoryMovie } from 'src/app/models/category-movie';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit{
  constructor(private moviesService: MoviesService) { }

  iconToShow: string = 'menu';
  menuOpen = false;
  genreMenuOpen = false;
  inCategoryMenu = false;
  menuCategoryMovies: CategoryMovie[] = [];

  toggleMenu() {
    (this.genreMenuOpen) 
    ? this.closeGenreMenu()
    : this.menuOpen = !this.menuOpen, this.updateIconToShow();
  }

  toggleGenreMenu() {
    this.genreMenuOpen ? this.closeGenreMenu() : this.openGenreMenu();
  }

  openGenreMenu() {
    this.genreMenuOpen = true;
    this.inCategoryMenu = true;
    this.updateIconToShow();
  }

  closeGenreMenu() {
    this.genreMenuOpen = false;
    this.inCategoryMenu = false;
    this.updateIconToShow();
  }

  updateIconToShow() {
    this.iconToShow = this.menuOpen
      ? this.genreMenuOpen
        ? 'keyboard_arrow_left'
        : 'clear'
      : 'menu';
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

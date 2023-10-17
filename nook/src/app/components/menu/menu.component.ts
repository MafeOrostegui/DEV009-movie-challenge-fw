import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { CategoryMovie } from 'src/app/models/category-movie';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  iconToShow: string = 'menu';
  menuOpen = false;
  genreMenuOpen = false;
  inCategoryMenu = false;
  menuCategoryMovies: CategoryMovie[] = [];
  isMovieInfoPage: boolean = false;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.categoryMovies();
    this.route.url.subscribe(segments => {
      this.isMovieInfoPage = segments.some(segment => segment.path === 'movie');
    });
  }

  toggleMenu() {
    if (this.genreMenuOpen) {
      this.closeGenreMenu();
    } else {
      this.menuOpen = !this.menuOpen;
      this.updateIconToShow();
    }
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

  categoryMovies() {
    this.moviesService.getCategoryMovies()
      .subscribe((response: { genres: CategoryMovie[] }) => {
        this.menuCategoryMovies = response.genres;
      });
  }
}

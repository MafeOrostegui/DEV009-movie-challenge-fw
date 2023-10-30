import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute
  ) { }

  iconToShow: string = 'menu';
  menuOpen = false;
  genreMenuOpen = false;
  inCategoryMenu = false;
  isInfoPage: boolean = false;

  ngOnInit() {
    this.route.url.subscribe(segments => {
      this.isInfoPage = segments.some(segment => segment.path === 'info' || segment.path === 'profile' || segment.path === 'library');
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
}

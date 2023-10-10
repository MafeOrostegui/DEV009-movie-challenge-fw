import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  menuOpen = false;
  genreMenuOpen = false;
  inCategoryMenu = false;

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
}

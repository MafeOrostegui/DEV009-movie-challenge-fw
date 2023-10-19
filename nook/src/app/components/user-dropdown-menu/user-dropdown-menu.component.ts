import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dropdown-menu',
  templateUrl: './user-dropdown-menu.component.html',
})
export class UserDropdownMenuComponent {

  constructor(private router: Router) {
    this.isMobile = window.innerWidth < 640
  }

  menuOpen = false;
  isMobile: boolean;

  toggleMenu() {
    !this.isMobile ? this.menuOpen = !this.menuOpen : this.router.navigate(['/profile']) 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 640;
  }
}

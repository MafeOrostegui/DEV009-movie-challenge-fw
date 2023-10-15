import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
  isMobile: boolean;

  constructor() {
    this.isMobile = window.innerWidth < 640
   }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 640;
  }
}

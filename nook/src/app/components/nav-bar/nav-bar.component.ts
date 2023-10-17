import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
  isMobile: boolean;
  activeRoute: string = '';

  constructor(private router: Router) {
    this.isMobile = window.innerWidth < 640

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      }
    });
   }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 640;
  }
}

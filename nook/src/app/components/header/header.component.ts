import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private router: Router) {
    this.isMobile = window.innerWidth < 640
   }

   isHome(): boolean {
    const regex = /^\/(home|movie\/\d+)$/;
    return regex.test(this.router.url);
  }
  
  isLandingPage() : boolean {
    return this.router.url === '/landing-page'
  }

  isForm() : boolean {
    return this.router.url === '/login' || this.router.url === '/sign-up'
  }

  isMobile: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 640;
  }
}

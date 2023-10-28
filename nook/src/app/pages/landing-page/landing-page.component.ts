import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})

export class LandingPageComponent {

  isMobile = window.innerWidth < 640;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 640;
  }
  constructor() { }
}

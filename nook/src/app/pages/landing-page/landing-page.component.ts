import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MoviesComponent } from 'src/app/components/movies/movies.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})

export class LandingPageComponent {

  isMobile = window.innerWidth < 611;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 611;
  }

  images: string[] = [
    '../../assets/slide-first-img.png',
    '../../assets/slide-second-img.png',
    '../../assets/slide-third-img.png',
    '../../assets/slide-four-img.png'
  ];

  points: string[] = [
    '../../assets/slide-point-first.svg',
    '../../assets/slide-point-second.svg',
    '../../assets/slide-point-third.svg',
    '../../assets/slide-point-four.svg',
  ];

  titles: string[] = [
    'Unlock the Future of Entertainment',
    'Access AI-Powered Recommendations',
    'Create Personalized Watchlists',
    'Sign up and start exploring!'
  ];
  subtitles: string[] = [
    'Elevate your streaming experience now!',
    'Discover favorites effortlessly.',
    'Prioritize your must-watch content.',
    ''
  ];

  currentImageIndex: number = 0;
  currentImage: string = this.images[this.currentImageIndex];
  currentPoint: string = this.points[this.currentImageIndex];
  currentTitle: string = this.titles[this.currentImageIndex];
  currentSubtitle: string = this.subtitles[this.currentImageIndex];

  changeImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.currentImage = this.images[this.currentImageIndex];
    this.currentPoint = this.points[this.currentImageIndex];
    this.currentTitle = this.titles[this.currentImageIndex];
    this.currentSubtitle = this.subtitles[this.currentImageIndex];
  }

  constructor() { }
}

import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Input } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private auth: Auth, private route: ActivatedRoute) {
    this.isMobile = window.innerWidth < 640
    this.user = false;
  }
  
  @Input() user: boolean;
  isProfile: boolean = false;
  isLibrary: boolean = false;
  isTvShows: boolean = false;
  isMovies: boolean = false;
  isMobile: boolean;

  ngOnInit() {
    this.subscribeToRouteChanges();
  }

  private subscribeToRouteChanges() {
    this.route.url.subscribe(segments => {
      this.isProfile = segments.some(segment => segment.path === 'profile');
      this.isMovies = segments.some(segment => segment.path === 'movies');
      this.isTvShows = segments.some(segment => segment.path === 'tvShows');
      this.isLibrary = segments.some(segment => segment.path === 'library');
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 640;
  }
}

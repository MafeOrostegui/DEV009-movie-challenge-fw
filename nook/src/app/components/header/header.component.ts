import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  user: User | null;
  isProfile: boolean = false;
  isLibrary: boolean = false;
  isMobile: boolean;

  constructor(private auth: Auth, private route: ActivatedRoute) {
    this.isMobile = window.innerWidth < 640
    this.user = null;
  }

  ngOnInit() {
    this.subscribeToAuthStateChanges();
    this.subscribeToRouteChanges();
  }

  private subscribeToAuthStateChanges() {
    this.auth.onAuthStateChanged((user) => {
      this.user = user && user.emailVerified ? user : null;
    });
  }

  private subscribeToRouteChanges() {
    this.route.url.subscribe(segments => {
      this.isProfile = segments.some(segment => segment.path === 'profile');
      this.isLibrary = segments.some(segment => segment.path === 'library');
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 640;
  }
}

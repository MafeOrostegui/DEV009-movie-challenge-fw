import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  user: User | null;

  constructor(private router: Router, private auth: Auth) {
    this.isMobile = window.innerWidth < 640
    this.user = null;
   }

   ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      this.user = user && user.emailVerified ? user : null;
      console.log(user);
    });
  }

  isMobile: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isMobile = window.innerWidth < 640;
  }
}

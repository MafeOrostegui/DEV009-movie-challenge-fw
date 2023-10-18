import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user: User | null;

  constructor(private auth: Auth) {
    this.user = null;
  }

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      this.user = user && user.emailVerified ? user : null;
    });
  }
}

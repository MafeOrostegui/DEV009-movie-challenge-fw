import { Injectable, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class authService implements OnDestroy {

  private auth: Auth = inject(Auth)
  user$ = authState(this.auth);
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      if (aUser) {
        console.log(aUser.uid)
      }
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async register(email: string, password: string, firstName: string): Promise<void> {
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
      await this.sendEmailVerification(user);
      await updateProfile(user, { displayName: firstName });
      this.router.navigate(['/email-verification'])
    } catch (error: any) {
      console.log(error)
      this.showErrorMessage('Email already in use');
    }
  }

  async sendEmailVerification(user: User): Promise<void> {
    try {
      await sendEmailVerification(user)
    } catch (error) {
      console.log(error)
    }
  }

  async login(email: string, password: string) {
    try {
      const { user } = await signInWithEmailAndPassword(this.auth, email, password);
      this.checkUserIsVerified(user)
    } catch (error: any) {
      this.showErrorMessage('Invalid Credentials');
    }
  }

  private checkUserIsVerified(user: User): void {
    const route = user.emailVerified ? '/home' : '/email-verification'
    this.router.navigate([route])
  }

  async logOut(): Promise<void> {
    try {
      await signOut(this.auth)
    } catch (error) {
      console.log('Sign out', error)
    }
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, 
    });
  }
}

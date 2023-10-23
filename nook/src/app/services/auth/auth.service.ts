import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User, setPersistence, browserLocalPersistence, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})

export class authService {
  constructor(
    private auth: Auth,
    private router: Router,
    private userService: UserService,
  ) {
    setPersistence(this.auth, browserLocalPersistence)
    onAuthStateChanged(this.auth, (user: User | null) => {
      user 
      ? (this.userService.setUserUID(user.uid), console.log(user.uid)) 
      : null;
    });
  }



  async register(email: string, password: string, firstName: string): Promise<void> {
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
      await this.sendEmailVerification(user);
      await updateProfile(user, { displayName: firstName });
      this.router.navigate(['/email-verification'])
    } catch (error: any) {
      console.log(error)
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
      console.log(user)
    } catch (error: any) {
      console.log('login', error);
    }
  }

  private checkUserIsVerified(user: User): void {
    const verified = true;
    const route = user.emailVerified ? '/home' : '/email-verification'
    this.router.navigate([route])
  }

  async logOut(): Promise<void> {
    try {
      await signOut(this.auth)
      this.userService.clearUserUID();
    } catch (error) {
      console.log('Sign out', error)
    }
  }
}

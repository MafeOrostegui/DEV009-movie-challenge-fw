import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, Auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, sendEmailVerification } from '@angular/fire/auth';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})

export class authService {
  constructor(
    private auth: Auth, private router: Router,
    private userService: UserService,
  ) {}

  async register(email: string, password: string, firstName: string): Promise<void> {
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
      await this.sendEmailVerification(user);
      await updateProfile(user, { displayName: firstName });
      this.router.navigate(['/email-verification'])
    } catch (error) {
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
      this.userService.setUserUID(user.uid); 
    } catch (error: any) {
      console.log('login', error);
      if (error.code === 'auth/invalid-login-credentials') {
        console.log('lo logre')
      }
    }
  }

  private checkUserIsVerified(user: User): void {
    const verified = true;
    const route = user.emailVerified ? '/home' : '/email-verification'
    this.router.navigate([route])
  }

  async logOut(): Promise<void> {
    try {
      signOut(this.auth)
    } catch (error) {
      console.log('Sign out', error)
    }
  }
}

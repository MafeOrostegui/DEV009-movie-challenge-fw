import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUID$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  setUserUID(uid: string) {
    this.userUID$.next(uid);
  }

  getUserUID() {
    return this.userUID$.asObservable();
  }

  clearUserUID() {
    this.userUID$.next(null);
  }
}

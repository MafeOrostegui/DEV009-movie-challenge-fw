import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userUID: string = '';

  setUserUID(uid: string) {
    this.userUID = uid;
  }

  getUserUID(): string {
    return this.userUID;
  }
}

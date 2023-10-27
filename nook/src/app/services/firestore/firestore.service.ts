import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, QuerySnapshot, getDocs, query, where, doc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from, map, switchMap, firstValueFrom, of } from 'rxjs';
import { User } from '@angular/fire/auth';
import { Movie } from 'src/app/models/movie';
import { authService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  private uidSubject: BehaviorSubject<string | null | undefined> = new BehaviorSubject<string | null | undefined>(null);
  uid$: Observable<string | null | undefined> = this.uidSubject.asObservable();

  constructor(private firestore: Firestore, private auth: authService) {
    auth.user$.subscribe((aUser: User | null) => {
      if (aUser) {
        this.uidSubject.next(aUser.uid);
      }
    });
  }

  async addMovieToList(idMovie: number, pathMovie: string, collectionName: string) {

    const uid = await firstValueFrom(this.uid$);

    if (!idMovie || !pathMovie || !collectionName || !uid) return;

    const userDocRef = doc(this.firestore, 'users', uid);
    const collectionRef = collection(userDocRef, collectionName);
    const moviesQuery = query(collectionRef, where('uid', '==', uid), where('id', '==', idMovie));
    const querySnapshot = await getDocs(moviesQuery);

    (querySnapshot.size === 0)
      ? await addDoc(collectionRef, { id: idMovie, poster_path: pathMovie, uid: uid })
      : console.log('the movie already exists in the list');
  }

  getMovies(collectionName: string): Observable<Movie[]> {
    return this.uid$.pipe(
      switchMap((uid) => {
        if (!uid) {
          return of([]);
        }
        const userDocRef = doc(this.firestore, 'users', uid);
        const collectionRef = collection(userDocRef, collectionName);
        const moviesQuery = query(collectionRef, where('uid', '==', uid));
        return from(getDocs(moviesQuery)).pipe(
          map((querySnapshot: QuerySnapshot) => {
            const moviesData: Movie[] = [];
            querySnapshot.forEach((doc) => {
              moviesData.push(doc.data() as Movie);
            });
            return moviesData;
          })
        );
      })
    );
  }
}


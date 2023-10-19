import { Injectable } from '@angular/core';
import { Firestore, DocumentReference, collection, addDoc, QuerySnapshot, getDocs, query, where } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { UserService } from '../user/user.service';
import { Movie } from 'src/app/models/movie';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  private moviesCollection = collection(this.firestore, `movies`);
  private userUID: string;

  constructor(private firestore: Firestore, private userService: UserService) {
    this.userUID = userService.getUserUID();
  }

  addMovieToList(idMovie: number, pathMovie: string) {
    if (!idMovie || !pathMovie) return;
    addDoc(this.moviesCollection, { id: idMovie, poster_path: pathMovie, userId: this.userUID }).then((documentReference: DocumentReference) => {
      console.log('New movie id:', documentReference.id);
    });
  }

  getMovies(): Observable<Movie[]> {
    const moviesQuery = query(this.moviesCollection, where('userId', '==', this.userUID));
    return from(getDocs(moviesQuery)).pipe(
      map((querySnapshot: QuerySnapshot) => {
        const moviesData: Movie[] = [];
        querySnapshot.forEach((doc) => {
          moviesData.push(doc.data() as Movie);
        });
        return moviesData;
      })
    );
  }
}


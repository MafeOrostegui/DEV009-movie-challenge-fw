import { Injectable } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { CategoryMovie } from 'src/app/models/category-movie';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private db: Database) { }

  getGenreImageById(id: number): Observable<string | null> {
    const genreRef = ref(this.db, '/genres');
    
    return new Observable((observer) => {
      get(genreRef).then((snapshot) => {
        const data: CategoryMovie[] = snapshot.val();
        const category = data.find((item) => item.id === id);

        if (category && 'image' in category) {
          observer.next(category.image);
        } else {
          observer.next(null);
        }
      }).catch((error) => {
        observer.error(error);
      });
    });
  }
}

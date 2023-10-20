import { Component, Input } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
})
export class LikeButtonComponent {
  constructor(private firestoreService: FirestoreService) { }

  @Input() movieId!: number;
  @Input() moviePath: string = '';
  iconToShow: string = 'favorite_border';

  addToList() {
    this.iconToShow = this.iconToShow === 'favorite_border' ? 'favorite' : 'favorite_border';
    this.firestoreService.addMovieToList(this.movieId, this.moviePath, 'favorites');
  }
}

import { Component, Input } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-add-to-list-button',
  templateUrl: './add-to-list-button.component.html',
})
export class AddToListButtonComponent {

  constructor(private firestoreService: FirestoreService) { }

  @Input() onlyIcon: boolean = false;
  @Input() movieId!: number;
  @Input() moviePath: string = '';
  iconToShow: string = 'add';
  wordToShow: string = 'Add to List'

  addToList() {
    this.iconToShow = this.iconToShow === 'add' ? 'done' : 'add';
    this.wordToShow = this.wordToShow === 'Add to List' ? 'Added to List' : 'Add to List';
    this.firestoreService.addMovieToList(this.movieId, this.moviePath, 'movies');
  }
}

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AddToListButtonComponent } from './add-to-list-button.component';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

describe('AddToListButtonComponent', () => {
  let component: AddToListButtonComponent;
  let fixture: ComponentFixture<AddToListButtonComponent>;
  let firestoreService: jasmine.SpyObj<FirestoreService>;

  beforeEach(() => {
    const firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', ['addMovieToList']);

    TestBed.configureTestingModule({
      declarations: [AddToListButtonComponent],
      providers: [
        { provide: FirestoreService, useValue: firestoreServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(AddToListButtonComponent);
    component = fixture.componentInstance;
    firestoreService = TestBed.inject(FirestoreService) as jasmine.SpyObj<FirestoreService>;
    fixture.detectChanges();
  });

  it('#addToList() should toogle #iconToShow', () => {
    component.onlyIcon = true;
    expect(component.iconToShow)
      .withContext('add at first')
      .toBe('add');
    component.addToList();
    expect(component.iconToShow)
      .withContext('done after click')
      .toBe('done');
    expect(component.iconToShow)
      .withContext('done after second click')
      .toBe('done');
  });

  it('#addToList() should toogle #wordToShow', () => {
    component.onlyIcon = false;
    expect(component.wordToShow)
      .withContext('add to List at first')
      .toBe('Add to List');
    component.addToList();
    expect(component.wordToShow)
      .withContext('Added to List after click')
      .toBe('Added to List');
    expect(component.wordToShow)
      .withContext('Added to List after second click')
      .toBe('Added to List');
  });

  it('#addToList() should call FirestoreService.addMovieToList with the correct arguments', () => {
    const movieId = 1;
    const moviePath = '/example.png';

    firestoreService.addMovieToList.and.returnValue(Promise.resolve());

    component.movieId = movieId;
    component.moviePath = moviePath;

    component.addToList();

    expect(firestoreService.addMovieToList).toHaveBeenCalledWith(movieId, moviePath, 'movies');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikeButtonComponent } from './like-button.component';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { MatIconModule } from '@angular/material/icon'; 

describe('LikeButtonComponent', () => {
  let component: LikeButtonComponent;
  let fixture: ComponentFixture<LikeButtonComponent>;
  let firestoreService: jasmine.SpyObj<FirestoreService>;

  beforeEach(() => {
    const firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', ['addMovieToList']);

    TestBed.configureTestingModule({
      declarations: [LikeButtonComponent],
      imports: [MatIconModule],
      providers: [
        { provide: FirestoreService, useValue: firestoreServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(LikeButtonComponent);
    component = fixture.componentInstance;
    firestoreService = TestBed.inject(FirestoreService) as jasmine.SpyObj<FirestoreService>;
    fixture.detectChanges();
  });

    it('#addToList() should toogle #iconToShow', () => {
    expect(component.iconToShow)
      .withContext('favorite_border at first')
      .toBe('favorite_border');
    component.addToList();
    expect(component.iconToShow)
      .withContext('favorite after click')
      .toBe('favorite');
    expect(component.iconToShow)
      .withContext('favorite after second click')
      .toBe('favorite');
  });

  it('#addToList() should call FirestoreService.addMovieToList with the correct arguments', () => {
    const movieId = 1;
    const moviePath = '/example.png';

    firestoreService.addMovieToList.and.returnValue(Promise.resolve());

    component.movieId = movieId;
    component.moviePath = moviePath;

    component.addToList();

    expect(firestoreService.addMovieToList).toHaveBeenCalledWith(movieId, moviePath, 'favorites');
  });
});

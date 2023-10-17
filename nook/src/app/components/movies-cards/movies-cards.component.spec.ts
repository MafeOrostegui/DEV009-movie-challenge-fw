import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesCardsComponent } from './movies-cards.component';

describe('MoviesComponent', () => {
  let component: MoviesCardsComponent;
  let fixture: ComponentFixture<MoviesCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesCardsComponent]
    });
    fixture = TestBed.createComponent(MoviesCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

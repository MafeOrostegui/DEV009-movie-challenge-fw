import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaCardsComponent } from './media-cards.component';

describe('MoviesComponent', () => {
  let component: MediaCardsComponent;
  let fixture: ComponentFixture<MediaCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaCardsComponent]
    });
    fixture = TestBed.createComponent(MediaCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

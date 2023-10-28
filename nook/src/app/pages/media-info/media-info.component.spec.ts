import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaInfoComponent } from './media-info.component';

describe('MovieInfoComponent', () => {
  let component: MediaInfoComponent;
  let fixture: ComponentFixture<MediaInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaInfoComponent]
    });
    fixture = TestBed.createComponent(MediaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

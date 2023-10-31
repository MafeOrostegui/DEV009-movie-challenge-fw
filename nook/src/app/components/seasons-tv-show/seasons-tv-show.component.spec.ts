import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsTvShowComponent } from './seasons-tv-show.component';

describe('SeasonsTvShowComponent', () => {
  let component: SeasonsTvShowComponent;
  let fixture: ComponentFixture<SeasonsTvShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeasonsTvShowComponent]
    });
    fixture = TestBed.createComponent(SeasonsTvShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

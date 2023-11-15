import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SeasonsTvShowComponent } from './seasons-tv-show.component';
import { MediaService } from 'src/app/services/media/media.service';
import { of } from 'rxjs';
import { Seasons } from 'src/app/models/seasons';
import { Episodes } from 'src/app/models/episodes';
import { SeasonDetails } from 'src/app/models/season-details';

const seasonDetailsMock: SeasonDetails = {
  id: '1',
  air_date: '12-12-23',
  episodes: [
    { id: 1, name: 'Episode 1', air_date: '12-12-12', episode_number: 1, still_path: '/example.png', overview: '' } as Episodes,
    { id: 2, name: 'Episode 2', air_date: '12-12-12', episode_number: 2, still_path: '/example.png', overview: '' } as Episodes,
  ],
};

describe('SeasonsTvShowComponent', () => {
  let component: SeasonsTvShowComponent;
  let fixture: ComponentFixture<SeasonsTvShowComponent>;
  let mediaServiceSpy: jasmine.SpyObj<MediaService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('MediaService', ['getSeasonInfo']);

    TestBed.configureTestingModule({
      declarations: [SeasonsTvShowComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: MediaService, useValue: spy }, FormBuilder],
    }).compileComponents();

    mediaServiceSpy = TestBed.inject(MediaService) as jasmine.SpyObj<MediaService>;
    mediaServiceSpy.getSeasonInfo.and.returnValue(of(seasonDetailsMock));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonsTvShowComponent);
    component = fixture.componentInstance;
    component.serieId = 123;
    component.seasons = [
      { season_number: 1, name: 'Season 1', id: 1 } as Seasons,
      { season_number: 2, name: 'Season 2', id: 2 } as Seasons,
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with seasons and select the first season', () => {
    component.onSeasonSelect(component.seasons[0].season_number)
    const formValue = component.form.get('seasonsSelect')?.value;
    const expectedValue = component.seasons[0].season_number;
    expect(formValue).toEqual(expectedValue);
  });

  it('should update the form and emit seasonInfo when ngOnChanges is called with new seasons', () => {
    const newSeasons: Seasons[] = [
      { season_number: 3, name: 'Season 3' } as Seasons,
      { season_number: 4, name: 'Season 4' } as Seasons,
    ];

    spyOn(component.seasonInfo, 'emit');

    component.ngOnChanges({ seasons: { currentValue: newSeasons, previousValue: component.seasons } as any });

    component.form.get('seasonsSelect')?.patchValue(newSeasons[0].season_number);
    component.onSeasonSelect(newSeasons[0].season_number)
    expect(component.form.get('seasonsSelect')?.value).toEqual(3);
    expect(mediaServiceSpy.getSeasonInfo).toHaveBeenCalledWith(component.serieId, 3);
    expect(component.seasonInfo.emit).toHaveBeenCalledWith(seasonDetailsMock);
  });
});

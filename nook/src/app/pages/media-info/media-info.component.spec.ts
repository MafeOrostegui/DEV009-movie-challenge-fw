import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MediaInfoComponent } from './media-info.component';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MediaCardsComponent } from 'src/app/components/media-cards/media-cards.component';
import { MediaCardComponent } from 'src/app/components/media-card/media-card.component';
import { MediaService } from 'src/app/services/media/media.service';
import { of, Subject } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { TvShow } from 'src/app/models/tv-show';
import { Actor } from 'src/app/models/actor';
import { SeasonDetails } from 'src/app/models/season-details';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { Episodes } from 'src/app/models/episodes';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { AddToListButtonComponent } from 'src/app/components/add-to-list-button/add-to-list-button.component';
import { LikeButtonComponent } from 'src/app/components/like-button/like-button.component';
import { MatIconModule } from '@angular/material/icon';
import { SeasonsTvShowComponent } from 'src/app/components/seasons-tv-show/seasons-tv-show.component';
import { Seasons } from 'src/app/models/seasons';

const mockMovie = {
  id: 1,
  title: 'Ejemplo 1',
  genres: [{ id: 1, name: 'Romance' }],
  poster_path: '/example.png',
  overview: '',
  popularity: 7.5,
  vote_average: 4.2,
  release_date: '2023-11-08',
  credits: { cast: [] as Actor[] },
  images: {
    backdrops: [
      { width: 12, height: 12, file_path: '/backdropMovie.jpg' },
      { width: 13, height: 13, file_path: '/backdrop2.jpg' }
    ],
    logos: [
      { file_path: '/logo.png', width: 20 }
    ]
  }
};

const mockMovies = {
  results: [
    {
      id: 3,
      title: 'Ejemplo 1',
      genres: [{ id: 1, name: 'Romance' }],
      poster_path: '/mockmovie1.png',
      popularity: 7.5,
      vote_average: 4.2,
      release_date: '2023-11-08',
    },
    {
      id: 5,
      title: 'Ejemplo 2',
      genres: [],
      poster_path: '/mockmovie2.png',
      popularity: 8.0,
      vote_average: 4.8,
      release_date: '2023-11-09',
    },
  ],
};

const mockTvShows = {
  id: 1,
  name: 'Ejemplo 1',
  genres: [{ id: 1, name: 'Romance' }],
  poster_path: '/example.png',
  vote_average: 4.2,
  first_air_date: '',
  backdrop_path: '/backdropTvShow.png',
  overview: '',
  credits: { cast: [] as Actor[] },
  number_of_seasons: 1,
  number_of_episodes: 10,
  episode_run_time: 30,
  seasons: [],
  status: 'Running',
  last_episode_to_air: {
    name: 'Last Episode',
    overview: 'Overview of the last episode',
  },
}

const seasonDetailsMock: SeasonDetails = {
  id: '1',
  air_date: '12-12-23',
  episodes: [
    { id: 1, name: 'Episode 1', air_date: '12-12-12', episode_number: 1, still_path: '/example.png', overview: '' } as Episodes,
    { id: 2, name: 'Episode 2', air_date: '12-12-12', episode_number: 2, still_path: '/example.png', overview: '' } as Episodes,
  ],
};

describe('MediaInfoComponent', () => {
  let component: MediaInfoComponent;
  let fixture: ComponentFixture<MediaInfoComponent>;
  let mediaServiceSpy: jasmine.SpyObj<MediaService>;
  let activatedRouteSubject: Subject<Params>;
  let firestoreServiceSpy: jasmine.SpyObj<FirestoreService>;

  beforeEach(() => {
    mediaServiceSpy = jasmine.createSpyObj('MediaService', ['getMediaInfo', 'getMedia']),
      mediaServiceSpy.getMedia.and.returnValue(of(mockMovies)),
      mediaServiceSpy.getMediaInfo.and.returnValue(of(mockMovie));
    firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', ['getMovies']),
      firestoreServiceSpy.getMovies.and.returnValue(of([]));

    const headerSpy = jasmine.createSpyObj<HeaderComponent>('HeaderComponent', {
      user: "true"
    } as any);

    const appCardsSpy = jasmine.createSpyObj<MediaCardsComponent>('MediaCardsComponent', {
      genre: "2",
      mediaType: "'movie'",
      useScrollX: "true"
    } as any);

    const appCardSpy = jasmine.createSpyObj<MediaCardComponent>('MediaCardComponent', {
      movieId: "1",
      mediaType: "'movie'"
    })

    const tvShowSeasonsSpy = jasmine.createSpyObj<SeasonsTvShowComponent>('SeasonsTvShowComponent', {
      serieId: "1",
      seasons: [
        { season_number: 3, name: 'Season 3' } as Seasons,
        { season_number: 4, name: 'Season 4' } as Seasons,
      ],
      seasonInfo: jasmine.createSpy('seasonInfo').and.returnValue(seasonDetailsMock)
    })

    const addToListComponentSpy = jasmine.createSpyObj<AddToListButtonComponent>('AddToListButtonComponent', {
      onlyIcon: false,
      movieId: 1,
      moviePath: '/example/path',
      addToList: jasmine.createSpy('addToList').and.returnValue(undefined)
    } as any);

    const addLikeButtonSpy = jasmine.createSpyObj<LikeButtonComponent>('AddToListButtonComponent', {
      movieId: 1,
      moviePath: '/example/path',
      addToList: jasmine.createSpy('addToList').and.returnValue(undefined)
    } as any);

    activatedRouteSubject = new Subject<Params>();

    TestBed.configureTestingModule({
      declarations: [MediaInfoComponent, HeaderComponent, NavBarComponent, MediaCardComponent, MediaCardsComponent, AddToListButtonComponent, LikeButtonComponent, MenuComponent],
      imports: [RouterTestingModule, MatIconModule],
      providers: [
        { provide: MediaService, useValue: mediaServiceSpy },
        { provide: ActivatedRoute, useValue: { params: activatedRouteSubject.asObservable(), url: of([]) } },
        { provide: HeaderComponent, useValue: headerSpy },
        { provide: NavBarComponent, useValue: {} },
        { provide: MediaCardComponent, useValue: appCardSpy },
        { provide: MediaCardsComponent, useValue: appCardsSpy },
        { provide: FirestoreService, useValue: firestoreServiceSpy },
        { provide: AddToListButtonComponent, useValue: addToListComponentSpy },
        { provide: LikeButtonComponent, useValue: addLikeButtonSpy },
        { provide: MenuComponent, useValue: {} },
        { provide: SeasonsTvShowComponent, useValue: tvShowSeasonsSpy }
      ],
    });
    fixture = TestBed.createComponent(MediaInfoComponent);
    component = fixture.componentInstance;
    mediaServiceSpy = TestBed.inject(MediaService) as jasmine.SpyObj<MediaService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movie info', waitForAsync(() => {
    mediaServiceSpy.getMediaInfo.and.returnValue(of(mockMovie));

    activatedRouteSubject.next({ media: 'movie', id: 1 });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.media).toBe('movie');
      expect(component.movie).toEqual(mockMovie);
    });
  }));

  it('should load TV show info', waitForAsync(() => {
    mediaServiceSpy.getMediaInfo.and.returnValue(of(mockTvShows));

    activatedRouteSubject.next({ media: 'tv', id: 1 });

    component.ngOnInit()

    fixture.whenStable().then(() => {
      expect(component.media).toBe('tv');
      expect(mediaServiceSpy.getMediaInfo).toHaveBeenCalledWith(1, 'tv')
      expect(component.tvShow).toEqual(mockTvShows);
    });
  }));

  it('should not load info for undefined media type', waitForAsync(() => {
    activatedRouteSubject.next({ media: undefined, id: 1 });

    mediaServiceSpy.getMediaInfo.and.returnValue(of({}))

    component.ngOnInit()

    fixture.whenStable().then(() => {
      expect(component.media).toBeUndefined();
      expect(mediaServiceSpy.getMediaInfo).not.toHaveBeenCalled()
      expect(component.movie).toEqual({} as Movie);
      expect(component.tvShow).toEqual({} as TvShow);
    });
  }));

  it('should handle selected season info', () => {
    component.handleSeasonInfoSelected(seasonDetailsMock);
    expect(component.seasonInfo).toEqual(seasonDetailsMock);
  });
});

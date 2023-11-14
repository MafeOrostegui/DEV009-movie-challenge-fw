import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { MediaCardsComponent } from './media-cards.component';
import { MediaService } from 'src/app/services/media/media.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Actor } from 'src/app/models/actor';
import { Movie } from 'src/app/models/movie';

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
  results: [
    {
      id: 1,
      name: 'Ejemplo 1',
      genres: [{ id: 1, name: 'Romance' }],
      poster_path: '/example.png',
      vote_average: 4.2,
      backdrop_path: '/backdrop.png'
    },
    {
      id: 2,
      name: 'Ejemplo 2',
      genres: [],
      poster_path: '/example2.png',
      vote_average: 4.8,
      backdrop_path: '/backdrop.png'
    },
  ],
};

const mockFirestoreData = [
  {
    id: 1,
    title: 'Ejemplo 1',
    genres: [{ id: 1, name: 'Romance' }],
    overview: 'Some overview',
    popularity: 7.5,
    poster_path: '/example.png',
    vote_average: 4.8,
    release_date: '2023-11-09',
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
  },
  {
    id: 2,
    title: 'Ejemplo 2',
    genres: [],
    overview: 'Some overview 2',
    popularity: 8.0,
    poster_path: '/example2.png',
    vote_average: 4.8,
    release_date: '2023-11-09',
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
  },
];

describe('MediaCardsComponent', () => {
  let component: MediaCardsComponent;
  let fixture: ComponentFixture<MediaCardsComponent>;
  let mediaService: jasmine.SpyObj<MediaService>;
  let firestoreService: jasmine.SpyObj<FirestoreService>;

  beforeEach(
    waitForAsync(() => {
      const mediaServiceSpy = jasmine.createSpyObj('MediaService', ['getMedia']);
      const firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', ['getMovies']);

      TestBed.configureTestingModule({
        declarations: [MediaCardsComponent],
        imports: [RouterTestingModule],
        providers: [
          { provide: MediaService, useValue: mediaServiceSpy },
          { provide: FirestoreService, useValue: firestoreServiceSpy },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCardsComponent);
    component = fixture.componentInstance;
    mediaService = TestBed.inject(MediaService) as jasmine.SpyObj<MediaService>;
    mediaService.getMedia.and.returnValue(of(mockMovies));
    firestoreService = TestBed.inject(FirestoreService) as jasmine.SpyObj<FirestoreService>;
    firestoreService.getMovies.and.returnValue(of(mockFirestoreData));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should call 'getMediaFromService' when 'movieType' is not 'movies' or 'favorites' and create the movie scroll when the 'MediaType' input is set to 'Movie'.", () => {
    const subtype = 'popular';
    const media = 'movie';

    component.movieType = subtype;
    component.mediaType = media;
    component.genre = undefined;
    component.useScrollX = true;

    component.ngOnInit(); 

    fixture.detectChanges();

    expect(mediaService.getMedia).toHaveBeenCalledWith(1, component.mediaType, component.movieType, component.genre);
    expect(component.movies).toEqual(mockMovies.results as Movie[]);
    expect(component.hasMediaData()).toBe(true);

    const imageElements: HTMLElement = fixture.nativeElement;
    const images = imageElements.querySelectorAll('img');
    const imageUrls = Array.from(images).map((imgElement) => imgElement.src);

    const expectedImageUrls = component.movies.map((movie) => movie.poster_path);

    expectedImageUrls.forEach((expectedUrl) => {
      const found = imageUrls.some((url) => url.includes(expectedUrl));
      expect(found).toBe(true);
    });
  });

  it('should call getMediaFromFirestore when movieType is "favorites"', () => {
    const subtype = 'favorites';
  
    component.movieType = subtype;
    component.useScrollX = false;
    component.ngOnInit(); 

    expect(firestoreService.getMovies).toHaveBeenCalledWith(component.movieType);
    expect(component.movies).toEqual(mockFirestoreData as Movie[]);
  });
});
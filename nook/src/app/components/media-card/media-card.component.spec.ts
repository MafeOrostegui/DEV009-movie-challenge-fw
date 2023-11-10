import { ComponentFixture, TestBed, tick, fakeAsync, waitForAsync } from '@angular/core/testing';
import { MediaCardComponent } from './media-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Movie } from 'src/app/models/movie';
import { Actor } from 'src/app/models/actor';
import { Router } from '@angular/router';
import { MediaService } from 'src/app/services/media/media.service';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { of } from 'rxjs';
import { TvShow } from 'src/app/models/tv-show';
import { AddToListButtonComponent } from '../add-to-list-button/add-to-list-button.component';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

const mockMovie = {
  id: 20,
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
}

describe('MediaCardComponent', () => {
  let component: MediaCardComponent;
  let fixture: ComponentFixture<MediaCardComponent>;
  let router: Router;
  let mediaService: jasmine.SpyObj<MediaService>;
  let firestoreService: jasmine.SpyObj<FirestoreService>;

  beforeEach(
    waitForAsync(() => {
      const mediaServiceSpy = jasmine.createSpyObj('MediaService', ['getMediaInfo']);
      const firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', ['addMovieToList']);
      const addToListComponentSpy = jasmine.createSpyObj<AddToListButtonComponent>('AddToListButtonComponent', {
        onlyIcon: false,
        movieId: 1,
        moviePath: '/example/path',
        addToList: jasmine.createSpy('addToList').and.returnValue(undefined)
      } as any);      
  
      TestBed.configureTestingModule({
        declarations: [MediaCardComponent, AddToListButtonComponent],
        imports: [RouterTestingModule.withRoutes([{ path: 'home', component: HomeComponent }])],
        providers: [
          { provide: MediaService, useValue: mediaServiceSpy },
          { provide: AddToListButtonComponent, useValue: addToListComponentSpy },
          { provide: FirestoreService, useValue: firestoreServiceSpy }
        ]
      }).compileComponents()
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCardComponent);
    router = TestBed.inject(Router);
    mediaService = TestBed.inject(MediaService) as jasmine.SpyObj<MediaService>;
    mediaService.getMediaInfo.and.returnValue(of(mockMovie));
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update isMobile when window is resized', () => {
    expect(component.isMobile).toBe(false);

    const event = new Event('resize');
    Object.defineProperty(event, 'target', { value: window });
    window.dispatchEvent(event);

    fixture.detectChanges();

    expect(component.isMobile).toBe(window.innerWidth < 611);
  });

  it('should navigate to /home', fakeAsync(() => {
    router.navigate(['/home']);
    tick();
    expect(router.url).toBe('/home');
    const isHome = component.isHome()
    expect(isHome).toBe(true)
  }));

  it('Should display the movie with the desired id when the mediaType is movie', () => {
    const movieId = 20;
    const mediaType = 'movie';

    component.movieId = movieId;
    component.mediaType = mediaType;

    component.ngOnInit();
    expect(mediaService.getMediaInfo).toHaveBeenCalledWith(movieId, mediaType);
    expect(component.movie).toEqual(mockMovie as Movie);
    console.log(component.movie)


    fixture.detectChanges();

    const imageElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
    const imageUrl = imageElement.src;

    expect(imageUrl).toContain(mockMovie.images.backdrops[0].file_path);
  });

  it('Should display the TvShow with the desired id when the mediaType is tv', () => {
    const movieId = 1;
    const mediaType = 'tv';

    component.movieId = movieId;
    component.mediaType = mediaType;

    mediaService.getMediaInfo.and.returnValue(of(mockTvShows));

    component.ngOnInit();
    expect(mediaService.getMediaInfo).toHaveBeenCalledWith(movieId, mediaType);
    expect(component.tvShow).toEqual(mockTvShows as TvShow);

     
    fixture.detectChanges();

    const imageElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
    const imageUrl = imageElement.src;

    expect(imageUrl).toContain(mockTvShows.backdrop_path);
  });

  it('should load movie info on ngOnChanges', () => {

    const movieId = 20;
    const mediaType = 'movie';

    component.movieId = movieId;
    component.mediaType = mediaType;

    component.ngOnChanges({
      movieId: {
        currentValue: component.movieId,
        firstChange: true,
        isFirstChange: () => true,
        previousValue: undefined
      }
    });

    component.ngOnInit()

    expect(mediaService.getMediaInfo).toHaveBeenCalledWith(movieId, mediaType);
    expect(component.movie).toEqual(mockMovie);
  });
});

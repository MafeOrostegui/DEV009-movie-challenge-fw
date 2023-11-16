import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingPageComponent } from './landing-page.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CarouselLandingPageComponent } from 'src/app/components/carousel-landing-page/carousel-landing-page.component';
import { CarouselMediaComponent } from 'src/app/components/carousel-media/carousel-media.component';
import { MediaService } from 'src/app/services/media/media.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MediaCardsComponent } from 'src/app/components/media-cards/media-cards.component';
import { of } from 'rxjs';

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

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let mediaServiceSpy: jasmine.SpyObj<MediaService>;
  let firestoreServiceSpy: jasmine.SpyObj<FirestoreService>;

  beforeEach(() => {
    const headerSpy = jasmine.createSpyObj<HeaderComponent>('HeaderComponent', {
      user: "false"
    } as any);

    mediaServiceSpy = jasmine.createSpyObj('MediaService', ['getMedia', 'getMediaInfo']),
    mediaServiceSpy.getMedia.and.returnValue(of(mockMovies)),
    mediaServiceSpy.getMediaInfo.and.returnValue(of({}));
    firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', ['getMovies']),
    firestoreServiceSpy.getMovies.and.returnValue(of([]));

    const carouselSpy = jasmine.createSpyObj<CarouselMediaComponent>('CarouselMediaComponent', {
      mediaSubtype: "'upcoming'"
    } as any);

    const appCardsSpy = jasmine.createSpyObj<MediaCardsComponent>('MediaCardsComponent', {
      movieType: "'on_the_air'",
      mediaType: "'tv'",
      useScrollX: "true"
    } as any);

    TestBed.configureTestingModule({
      declarations: [LandingPageComponent, HeaderComponent, CarouselLandingPageComponent, CarouselMediaComponent, MediaCardsComponent],
      imports: [RouterTestingModule, CarouselModule, BrowserAnimationsModule],
      providers: [{provide: HeaderComponent, useValue: headerSpy},
      {provide: CarouselLandingPageComponent, useValue: {}},
      { provide: CarouselMediaComponent, useValue: carouselSpy },
      { provide: MediaService, useValue: mediaServiceSpy },
      { provide: MediaCardsComponent, useValue: appCardsSpy },
      { provide: FirestoreService, useValue: firestoreServiceSpy }]
    });
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update isMobile when window is resized', fakeAsync(() => {

    const event = new Event('resize');
    Object.defineProperty(event, 'target', { value: window });
    window.dispatchEvent(event);
  
    tick(); 
  
    fixture.detectChanges();
  
    expect(component.isMobile).toBe(window.innerWidth < 611);
  }));
});

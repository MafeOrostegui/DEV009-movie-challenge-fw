import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { MediaCardsComponent } from 'src/app/components/media-cards/media-cards.component';
import { MediaCardComponent } from 'src/app/components/media-card/media-card.component';
import { MediaService } from 'src/app/services/media/media.service';
import { CarouselMediaComponent } from 'src/app/components/carousel-media/carousel-media.component';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatIconModule } from '@angular/material/icon';
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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let mediaServiceSpy: jasmine.SpyObj<MediaService>;
  let firestoreServiceSpy: jasmine.SpyObj<FirestoreService>;

  beforeEach(() => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['url']),
      activatedRouteSpy.url = of([]);
    mediaServiceSpy = jasmine.createSpyObj('MediaService', ['getMedia', 'getMediaInfo']),
      mediaServiceSpy.getMedia.and.returnValue(of(mockMovies)),
      mediaServiceSpy.getMediaInfo.and.returnValue(of({}));
    firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', ['getMovies']),
      firestoreServiceSpy.getMovies.and.returnValue(of([]));

    const headerSpy = jasmine.createSpyObj<HeaderComponent>('HeaderComponent', {
      user: "true"
    } as any);

    const carouselSpy = jasmine.createSpyObj<CarouselMediaComponent>('CarouselMediaComponent', {
      mediaSubtype: "'upcoming'"
    } as any);

    const appCardsSpy = jasmine.createSpyObj<MediaCardsComponent>('MediaCardsComponent', {
      movieType: "'on_the_air'",
      mediaType: "'tv'",
      useScrollX: "true"
    } as any);

    const appCardSpy = jasmine.createSpyObj<MediaCardComponent>('MediaCardComponent', {
      movieId: "1151534",
      mediaType: "'movie'"
    })

    TestBed.configureTestingModule({
      declarations: [HomeComponent, HeaderComponent, NavBarComponent, CarouselMediaComponent, MediaCardComponent, MediaCardsComponent, MenuComponent],
      imports: [RouterTestingModule, MatIconModule, CarouselModule, BrowserAnimationsModule],
      providers: [{ provide: HeaderComponent, useValue: headerSpy },
      { provide: NavBarComponent, useValue: {} },
      { provide: MediaCardComponent, useValue: appCardSpy },
      { provide: MenuComponent, useValue: {} },
      { provide: MediaCardsComponent, useValue: appCardsSpy },
      { provide: CarouselMediaComponent, useValue: carouselSpy },
      { provide: ActivatedRoute, useValue: activatedRouteSpy },
      { provide: MediaService, useValue: mediaServiceSpy },
      { provide: FirestoreService, useValue: firestoreServiceSpy }],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

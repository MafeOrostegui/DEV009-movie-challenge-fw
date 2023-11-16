import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MediaCardsComponent } from 'src/app/components/media-cards/media-cards.component';
import { LibraryComponent } from './library.component';
import { MediaService } from 'src/app/services/media/media.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
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

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;
  let mediaServiceSpy: jasmine.SpyObj<MediaService>;
  let firestoreServiceSpy: jasmine.SpyObj<FirestoreService>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

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

    const appCardsSpy = jasmine.createSpyObj<MediaCardsComponent>('MediaCardsComponent', {
      movieType: "'on_the_air'",
      mediaType: "'tv'",
      useScrollX: "true"
    } as any);

    TestBed.configureTestingModule({
      declarations: [LibraryComponent, NavBarComponent, HeaderComponent, MediaCardsComponent, MenuComponent],
      imports: [RouterTestingModule, MatIconModule],
      providers: [{ provide: HeaderComponent, useValue: headerSpy },
      { provide: NavBarComponent, useValue: {} },
      { provide: MediaCardsComponent, useValue: appCardsSpy },
      { provide: MediaService, useValue: mediaServiceSpy },
      { provide: FirestoreService, useValue: firestoreServiceSpy },
      { provide: ActivatedRoute, useValue: activatedRouteSpy },
      { provide: MenuComponent, useValue: {} }],
    });
    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

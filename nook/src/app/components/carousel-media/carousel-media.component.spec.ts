import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselComponent, CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselMediaComponent } from './carousel-media.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MediaService } from 'src/app/services/media/media.service';
import { Movie } from 'src/app/models/movie';
import { TvShow } from 'src/app/models/tv-show';
import { of } from 'rxjs';

const mockMovies = {
  results: [
    {
      id: 1,
      title: 'Ejemplo 1',
      genres: [{ id: 1, name: 'Romance' }],
      poster_path: '/example.png',
      popularity: 7.5,
      vote_average: 4.2,
      release_date: '2023-11-08',
    },
    {
      id: 2,
      title: 'Ejemplo 2',
      genres: [],
      poster_path: '/example2.png',
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
}

const mockInfoMovies = {
  'images': {
    'backdrops': [
      { 'width': 12, 'height': 12, 'file_path': '/backdrop.jpg' },
      { 'width': 13, 'height': 13, 'file_path': '/backdrop2.jpg' }
    ],
    'logos': [
      { 'file_path': '/logo.png', 'width': 20 }
    ]
  }
};

describe('CarouselMediaComponent', () => {
  let component: CarouselMediaComponent;
  let fixture: ComponentFixture<CarouselMediaComponent>;
  let mediaService: jasmine.SpyObj<MediaService>

  beforeEach(
    waitForAsync(() => {
      const mediaServiceSpy = jasmine.createSpyObj('MediaService', ['getMedia', 'getMediaInfo'])

      TestBed.configureTestingModule({
        declarations: [
          CarouselMediaComponent, CarouselComponent
        ],
        imports: [
          CarouselModule, BrowserAnimationsModule, RouterTestingModule
        ],
        providers: [
          { provide: MediaService, useValue: mediaServiceSpy }
        ]
      }).compileComponents()
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselMediaComponent);
    component = fixture.componentInstance;
    mediaService = TestBed.inject(MediaService) as jasmine.SpyObj<MediaService>;
    mediaService.getMedia.and.returnValue(of(mockMovies));
    mediaService.getMediaInfo.and.returnValue(of(mockInfoMovies))
    fixture.detectChanges();
  })

  it('should have customOptions with specific properties', () => {
    expect(component.customOptions.loop).toBe(true);
    expect(component.customOptions.autoplay).toBe(true);
    expect(component.customOptions.autoHeight).toBe(false);
    expect(component.customOptions.autoWidth).toBe(false);
    expect(component.customOptions.center).toBe(true);
    expect(component.customOptions.responsive).toBeDefined();
  });

  it("Should create the movie carousel when the MediaType input is set to 'Movie'.", () => {

    const subtype = 'popular';
    const media = 'movie';

    component.mediaSubtype = subtype;
    component.mediaType = media;
    component.genre = undefined;

    component.ngOnInit()

    expect(mediaService.getMedia).toHaveBeenCalledWith(1, component.mediaType, component.mediaSubtype, component.genre);
    expect(component.movies).toEqual(mockMovies.results as Movie[])

    component['loadMovieInfoForMovies']()

    for (const movie of component.movies) {
      expect(mediaService.getMediaInfo).toHaveBeenCalledWith(movie.id, 'movie');
      const updatedMovie = {
        ...movie, images: {
          backdrops: mockInfoMovies.images.backdrops,
          logos: mockInfoMovies.images.logos
        }
      };
      Object.assign(movie, updatedMovie);
    }

    fixture.detectChanges();

    const imageElements: HTMLElement = fixture.nativeElement;
    const images = imageElements.querySelectorAll('img');
    const imageUrls = Array.from(images).map(imgElement => imgElement.src);

    const expectedImageUrls = component.movies.map(movie => movie.images.backdrops[0].file_path && movie.images.logos[0].file_path);

    expectedImageUrls.forEach(expectedUrl => {
      const found = imageUrls.some(url => url.includes(expectedUrl));
      expect(found).toBe(true);
    });
  });

  it("Should create the TV show carousel when the MediaType input is set to 'TV'", () => {
    const subtype = 'popular';
    const media = 'tv';

    component.mediaSubtype = subtype;
    component.mediaType = media;
    component.genre = undefined;

    mediaService.getMedia.and.returnValue(of(mockTvShows));

    component.ngOnInit();

    expect(mediaService.getMedia).toHaveBeenCalledWith(1, component.mediaType, component.mediaSubtype, component.genre);
    expect(component.tvShows).toEqual(mockTvShows.results as TvShow[]);

    component['loadMovieInfoForTvShows']();

    for (const tvShow of component.tvShows) {
      expect(mediaService.getMediaInfo).toHaveBeenCalledWith(tvShow.id, 'tv');
    }

    fixture.detectChanges();

    const imageElements: HTMLElement = fixture.nativeElement;
    const images = imageElements.querySelectorAll('img');
    const imageUrls = Array.from(images).map((imgElement) => imgElement.src);

    const expectedImageUrls = component.tvShows.map(
      (tvShow) => tvShow.backdrop_path!
    );

    expectedImageUrls.forEach((expectedUrl) => {
      const found = imageUrls.some((url) => url.includes(expectedUrl));
      expect(found).toBe(true);
    });
  });

});

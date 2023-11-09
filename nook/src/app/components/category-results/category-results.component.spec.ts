import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryResultsComponent } from './category-results.component';
import { RouterTestingModule } from '@angular/router/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Movie } from 'src/app/models/movie';
import { BackdropImage } from 'src/app/models/backdrop-image';
import { LogosImages } from 'src/app/models/logos-images';
import { Actor } from 'src/app/models/actor';

const mockMovies = {
  results: [
    {
      id: 1,
      title: 'Ejemplo 1',
      genres: [{ id: 1, name: 'Romance' }],
      poster_path: '/example.png',
      overview: '',
      popularity: 7.5,
      vote_average: 4.2,
      release_date: '2023-11-08',
      credits: {cast: [] as Actor[] },
      images: { backdrops: [] as BackdropImage[], logos: [] as LogosImages[] }
    },
    {
      id: 2,
      title: 'Ejemplo 2',
      genres: [{ id: 1, name: 'Romance' }],
      poster_path: '/example2.png',
      overview: '',
      popularity: 8.0,
      vote_average: 4.8,
      release_date: '2023-11-09',
      credits: {cast: [] as Actor[] },
      images: { backdrops: [] as BackdropImage[], logos: [] as LogosImages[] }
    },
  ],
};

describe('CategoryResultsComponent', () => {
  let component: CategoryResultsComponent;
  let fixture: ComponentFixture<CategoryResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryResultsComponent],
      imports: [ RouterTestingModule, InfiniteScrollModule ]
    });
    fixture = TestBed.createComponent(CategoryResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit scrolled event on scroll', () => {
   const spyScrolled = spyOn(component.scrolled, 'emit');

   component.onScroll();
   expect(spyScrolled).toHaveBeenCalled()
   expect(component.scrollUpDistance).toBe(1)
  });

  it('should display the category name and movies', () => {
    component.movies = mockMovies.results as Movie[];
    component.categoryName = 'Romance';
    fixture.detectChanges();

    const titleElement = HTMLElement = fixture.nativeElement;
    const title = titleElement.querySelector('h1');

    const imageElements: HTMLElement = fixture.nativeElement;
    const images = imageElements.querySelectorAll('img');
    const imageUrls = Array.from(images).map(imgElement => imgElement.src);
    const expectedImageUrls = component.movies.map(movie => movie.poster_path);

    expectedImageUrls.forEach(expectedUrl => {
      const found = imageUrls.some(url => url.includes(expectedUrl));
      expect(found).toBe(true);
    });

    expect(title.textContent).toContain(component.categoryName);
  })
});

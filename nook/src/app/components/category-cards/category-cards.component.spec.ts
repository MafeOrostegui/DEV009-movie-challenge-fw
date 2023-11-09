import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CategoryCardsComponent } from './category-cards.component';
import { MediaService } from 'src/app/services/media/media.service';
import { DataService } from 'src/app/services/data/data.service';
import { CategoryMovie } from 'src/app/models/category-movie';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

const mockCategoryMovie: { genres: CategoryMovie[] } = {
  genres: [
    { id: 1, name: 'Action', image: '' },
    { id: 2, name: 'Adventure', image: '' },
  ],
};

const mockGenreImages = [
  'https://example.com/action.jpg',
  'https://example.com/adventure.jpg',
];

describe('CategoryCardsComponent', () => {
  let component: CategoryCardsComponent;
  let fixture: ComponentFixture<CategoryCardsComponent>;
  let mediaServiceSpy: jasmine.SpyObj<MediaService>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(
    waitForAsync(() => {
      mediaServiceSpy = jasmine.createSpyObj('MediaService', ['getCategoryMedia']);
      dataServiceSpy = jasmine.createSpyObj('DataService', ['getGenreImageById']);

      TestBed.configureTestingModule({
        declarations: [ CategoryCardsComponent ],
        imports: [ RouterTestingModule ],
        providers: [
          { provide: MediaService, useValue: mediaServiceSpy },
          { provide: DataService, useValue: dataServiceSpy },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCardsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get category media and genre images on initialization and render the category', () => {
    component.links = false;

    mediaServiceSpy.getCategoryMedia.and.returnValue(of(mockCategoryMovie));
    dataServiceSpy.getGenreImageById.and.returnValues(
      of(mockGenreImages[0]),
      of(mockGenreImages[1])
    );

    fixture.detectChanges();

    expect(mediaServiceSpy.getCategoryMedia).toHaveBeenCalledWith('movie');
    expect(component.menuCategoryMovies).toEqual(mockCategoryMovie.genres);

    mockCategoryMovie.genres.forEach((category, index) => {
      expect(dataServiceSpy.getGenreImageById).toHaveBeenCalledWith(
        category.id
      );
      expect(category.image).toEqual(mockGenreImages[index]);
    });

    const imageElements: HTMLElement = fixture.nativeElement; 
    const images = imageElements.querySelectorAll('img');
    const imageUrls = Array.from(images).map(imgElement => imgElement.getAttribute('src'));

    imageUrls.forEach((imgUrl, index) => {
      expect(imgUrl).toContain(mockGenreImages[index])
    })
  });
});

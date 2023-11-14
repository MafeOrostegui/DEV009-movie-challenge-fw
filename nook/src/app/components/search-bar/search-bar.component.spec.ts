import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { FormBuilder } from '@angular/forms';
import { MediaService } from 'src/app/services/media/media.service';
import { SearchStateService } from 'src/app/services/search-state/search-state.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Results } from 'src/app/models/results';
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

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let mediaServiceSpy: jasmine.SpyObj<MediaService>;
  let searchStateServiceSpy: jasmine.SpyObj<SearchStateService>;

  beforeEach(() => {
    const mediaSpy = jasmine.createSpyObj('MediaService', ['searchMovies']);
    const searchStateSpy = jasmine.createSpyObj('SearchStateService', ['getSearchTerm', 'setSearchTerm']);
  
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: MediaService, useValue: mediaSpy },
        { provide: SearchStateService, useValue: searchStateSpy }
      ]
    });
  
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    mediaServiceSpy = TestBed.inject(MediaService) as jasmine.SpyObj<MediaService>;
    searchStateServiceSpy = TestBed.inject(SearchStateService) as jasmine.SpyObj<SearchStateService>;
    fixture.detectChanges();
  });  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and set search term from service', () => {
    searchStateServiceSpy.getSearchTerm.and.returnValue('test');
    component.ngOnInit();
    expect(component.form.value.inputSearch).toBe('test');
  });

  it('should clear search term and emit clearSearchEvent', () => {
    spyOn(component.clearSearchEvent, 'emit');
    component.clearSearch();
    expect(component.form.value.inputSearch).toBe('');
    expect(searchStateServiceSpy.setSearchTerm).toHaveBeenCalledWith('');
    expect(component.clearSearchEvent.emit).toHaveBeenCalled();
  });

  it('should emit search results and update search state on successful search', fakeAsync(() => {
    const query = 'Test Query';
    const currentPage = 1;
    const results: Results = { results: [...mockMovies.results] }; 
    
    component.form.get('inputSearch')?.setValue(query);
    component.form.get('currentPage')?.setValue(currentPage);
  
    mediaServiceSpy.searchMovies.and.returnValue(of(results));
  
    spyOn(component.searchResults, 'emit');
  
    component.search(query, currentPage);
  
    tick(); 
  
    expect(component.searchResults.emit).toHaveBeenCalledWith(results);
    expect(searchStateServiceSpy.setSearchTerm).toHaveBeenCalledWith(query);
    expect(component.form.get('currentPage')?.value).toBe(currentPage);
  }));

  it('should fetch more results and emit updated results on fetchMoreResults', fakeAsync(() => {
    const currentPage = 1;
    const additionalResults: Results = { results: [...mockMovies.results] };
  
    component.form.get('currentPage')?.setValue(currentPage);
    component['currentResults'] = { results: [] };
  
    mediaServiceSpy.searchMovies.and.returnValue(of(additionalResults));
  
    spyOn(component.searchResults, 'emit'); 
  
    component.fetchMoreResults();
  
    tick(); 
  
    expect(component['currentResults'].results.length).toBeGreaterThan(0);
    expect(component.searchResults.emit).toHaveBeenCalledWith(component['currentResults']);
  }));

  it('should clear search and emit clear event on clearSearch', () => {
    spyOn(component.clearSearchEvent, 'emit');

    component.clearSearch();

    expect(component.form.get('inputSearch')?.value).toBe('');
    expect(searchStateServiceSpy.setSearchTerm).toHaveBeenCalledWith('');
    expect(component.clearSearchEvent.emit).toHaveBeenCalled();
  });
});


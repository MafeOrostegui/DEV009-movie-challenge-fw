import { TestBed, inject } from '@angular/core/testing';
import { SearchStateService } from './search-state.service';
import { Results } from 'src/app/models/results';
import { Movie } from 'src/app/models/movie';
import { Actor } from 'src/app/models/actor';
import { BackdropImage } from 'src/app/models/backdrop-image';
import { LogosImages } from 'src/app/models/logos-images';

const mockMovies: { results: Movie[] } = {
  results: [
    {
      id: 3,
      title: 'Ejemplo 1',
      genres: [{ id: 1, name: 'Romance' }],
      poster_path: '/mockmovie1.png',
      popularity: 7.5,
      overview: '',
      vote_average: 4.2,
      release_date: '2023-11-08',
      credits: {cast: [] as Actor[] },
      images: { backdrops: [] as BackdropImage[], logos: [] as LogosImages[] }
    },
    {
      id: 5,
      title: 'Ejemplo 2',
      genres: [],
      poster_path: '/mockmovie2.png',
      popularity: 8.0,
      vote_average: 4.8,
      overview: '',
      release_date: '2023-11-09',
      credits: {cast: [] as Actor[] },
      images: { backdrops: [] as BackdropImage[], logos: [] as LogosImages[] }
    },
  ],
};

describe('SearchStateService', () => {
  let service: SearchStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchStateService]
    });

    service = TestBed.inject(SearchStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get search results', () => {
    const mockResults: Results = mockMovies;

    service.setSearchResults(mockResults);
    const retrievedResults = service.getSearchResults();

    expect(retrievedResults).toEqual(mockResults);
  });

  it('should set and get search term', () => {
    const searchTerm = 'Angular';

    service.setSearchTerm(searchTerm);
    const retrievedSearchTerm = service.getSearchTerm();

    expect(retrievedSearchTerm).toEqual(searchTerm);
  });

  it('should return null for search term if not set', () => {
    const retrievedSearchTerm = service.getSearchTerm();

    expect(retrievedSearchTerm).toBeNull();
  });
});


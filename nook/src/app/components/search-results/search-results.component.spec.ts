import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchResultsComponent } from './search-results.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Movie } from 'src/app/models/movie';
import { TvShow } from 'src/app/models/tv-show';
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

const mockTvShows: { results: (TvShow & { media_type?: string })[];} = {
  results: [
    {
      id: 1,
      name: 'Ejemplo 1',
      genres: [{ id: 1, name: 'Romance' }],
      poster_path: '/example.png',
      vote_average: 4.2,
      first_air_date: '',
      backdrop_path: '/backdropTvShow.png',
      overview: '',
      credits: { cast: [] as Actor[] },
      number_of_seasons: 1,
      number_of_episodes: 10,
      episode_run_time: 30,
      seasons: [],
      status: 'Running',
      last_episode_to_air: {
        name: 'Last Episode',
        overview: 'Overview of the last episode', 
      },
      media_type: 'tv'
    },
    {
      id: 1,
      name: 'Ejemplo 1',
      genres: [{ id: 1, name: 'Romance' }],
      poster_path: '/example.png',
      vote_average: 4.2,
      first_air_date: '',
      backdrop_path: '/backdropTvShow.png',
      overview: '',
      credits: { cast: [] as Actor[] },
      number_of_seasons: 1,
      number_of_episodes: 10,
      episode_run_time: 30,
      seasons: [],
      status: 'Running',
      last_episode_to_air: {
        name: 'Last Episode',
        overview: 'Overview of the last episode', 
      },
      media_type: 'tv'
    },
  ],
};

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      imports: [RouterTestingModule, InfiniteScrollModule]
    });
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit scrolled event on scroll', () => {
    const spyScrolled = spyOn(component.scrolled, 'emit');

    component.onScrollSearch();
    expect(spyScrolled).toHaveBeenCalled();
    expect(component.scrollUpDistance).toBe(0.1);
  });

 it('should return true for isTvShow if result is a TvShow', () => {
    expect(component.isTvShow(mockTvShows.results[0])).toBe(true);
  });

  it('should return title for getTitle if result has title', () => {
    expect(component.getTitle(mockMovies.results[0])).toBe('Ejemplo 1');
  });

  it('should return title for getTitle if result has name', () => {
    expect(component.getTitle(mockTvShows.results[0])).toBe('Ejemplo 1');
  });

  it('should return "Unknown Title" for getTitle if result has neither title nor name', () => {
    const unknownResult: any = { id: 1 };
    expect(component.getTitle(unknownResult)).toBe('Unknown Title');
  });
});

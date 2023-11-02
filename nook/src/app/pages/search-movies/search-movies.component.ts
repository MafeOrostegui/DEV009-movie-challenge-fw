import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaService } from 'src/app/services/media/media.service';
import { SearchStateService } from 'src/app/services/search-state/search-state.service';
import { Results, emptyResults } from 'src/app/models/results';
import { Movie } from 'src/app/models/movie';
import { ActivatedRoute } from '@angular/router';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
})
export class SearchMoviesComponent implements OnInit {

  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  
  constructor(
    private moviesService: MediaService,
    private route: ActivatedRoute,
    private searchStateService: SearchStateService
  ) { }

  searchResults: Results | null = null;
  categorySelected: number | null = null;
  categoryName: string | null = null;
  movies: Movie[] = [];
  page: number = 1;
  loading: boolean = false;

  handleSearchResults(results: Results) {
    this.searchResults = results;
    console.log(this.searchResults)
    this.searchStateService.setSearchResults(results);
  }

  clearSearch() {
    this.searchResults = null;
    this.searchStateService.setSearchResults(emptyResults);
  }

  ngOnInit(): void {
    const savedResults = this.searchStateService.getSearchResults();
    if (savedResults) {
      this.searchResults = savedResults;
    }

    this.route.paramMap.subscribe((params) => {
      const genreId = params.get('id');
      const genreName = params.get('categoryName');
      if (genreId !== null) {
        this.categorySelected = +genreId;
        this.categoryName = genreName;
        this.resetPageAndMovies();
        this.getMoviesFromService();
      }
    });
  }

  private resetPageAndMovies(): void {
    this.page = 1;
    this.movies = [];
  }

  private getMoviesFromService(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    if (this.categorySelected !== null) {
      this.moviesService
        .getMedia(this.page, 'movie', undefined, this.categorySelected)
        .subscribe((response: Results) => {
          if (response && response.results) {
            this.movies = this.movies.concat(response.results as Movie[]);
            this.page++;
            this.loading = false;
          }
        });
    }
  }

  onScroll() {
    this.getMoviesFromService();
  }

  onScrollSearch(){
    this.searchBar.fetchMoreResults();
  }
}

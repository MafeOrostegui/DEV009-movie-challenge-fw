import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { SearchStateService } from 'src/app/services/search-state/search-state.service';
import { Movie } from 'src/app/models/movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
})
export class SearchMoviesComponent implements OnInit {
  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private searchStateService: SearchStateService
  ) { }

  searchResults: any;
  categorySelected: number | null = null;
  categoryName: string | null = null;
  movies: Movie[] = [];

  handleSearchResults(results: Movie[]) {
    this.searchResults = results;
    this.searchStateService.setSearchResults(results);
  }

  clearSearch() {
    this.searchResults = null;
    this.searchStateService.setSearchResults(null);
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
        this.getMoviesFromService();
      }
    });
  }

  private getMoviesFromService(): void {
    if (this.categorySelected !== null) {
      this.moviesService
        .getMovies(1, undefined, this.categorySelected)
        .subscribe((response) => {
          this.movies = response.results as Movie[];
          console.log(this.movies)
        });
    }
  }
}

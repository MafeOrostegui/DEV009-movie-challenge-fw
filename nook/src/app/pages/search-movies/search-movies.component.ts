import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';
import { Movie } from 'src/app/models/movie';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
})
export class SearchMoviesComponent implements OnInit {
  constructor(
  private moviesService: MoviesService,
  private route: ActivatedRoute) { }

  searchResults: any;
  categorySelected: number | null = null; 
  categoryName: string | null = null;
  movies: Movie[] = [];

  handleSearchResults(results: any) {
    this.searchResults = results;
  }

  handleCategorySelected(categoryId: number, categoryName: string) {
    this.categorySelected = categoryId;
    this.categoryName = categoryName;
    this.getMoviesFromService();
  }

  clearSearch() {
    this.searchResults = null;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
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

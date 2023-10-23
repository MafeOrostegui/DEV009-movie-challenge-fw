import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  constructor(private http: HttpClient) { }

  private apiKey = '49a18f8a2dc1ca4105c158804e2ea08e';
  private apiUrl = 'https://api.themoviedb.org/3';

  getMovies(page: number, kind?: string, genre?: null | number): Observable<any> {
    let url: string;

    (genre)
      ? url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genre}&page=${page}`
      : url = `${this.apiUrl}/movie/${kind}?api_key=${this.apiKey}&page=${page}`;

    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  getMovieInfo(movieId: number): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}&append_to_response=credits,images`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCategoryMovies(): Observable<any> {
    const url = `${this.apiUrl}/genre/movie/list?language=en&api_key=${this.apiKey}`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  searchMovies(query: string): Observable<any> {
    const url = `${this.apiUrl}/search/multi?api_key=${this.apiKey}&query=${query}`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage =
      error.status === 0
        ? `An error occurred: ${error.error}`
        : `Backend returned code ${error.status}, body was: ${error.error}`;

    console.error(errorMessage);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  private apiKey = '49a18f8a2dc1ca4105c158804e2ea08e';
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getMovies(kind: string, page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${kind}?api_key=${this.apiKey}&page=${page}`)
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

  getMoviesByCategory(genreId: number, page: number): Observable<any> {
    const url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&page=${page}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
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

  getPopularMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUpcomingMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTopRatedMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/top_rated?language=en-US&page=1&api_key=${this.apiKey}`;
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
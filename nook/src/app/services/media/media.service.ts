import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MediaService {

  constructor(private http: HttpClient) { }

  private apiKey = '49a18f8a2dc1ca4105c158804e2ea08e';
  private apiUrl = 'https://api.themoviedb.org/3';

  getMedia(page: number, media: string | undefined, kind?: string | undefined, genre?: null | number): Observable<any> {
    let url: string;

    if (genre) {
      url = `${this.apiUrl}/discover/${media}?api_key=${this.apiKey}&with_genres=${genre}&page=${page}`
    } else if (kind) {
      url = `${this.apiUrl}/${media}/${kind}?api_key=${this.apiKey}&page=${page}`
    } else {
      url = `${this.apiUrl}/discover/${media}?api_key=${this.apiKey}&page=${page}`
    }
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  getMediaInfo(movieId: number, media: string | undefined): Observable<any> {
    const url = `${this.apiUrl}/${media}/${movieId}?api_key=${this.apiKey}&append_to_response=credits,images`;
    return this.http.get(url)
      .pipe(

        catchError(this.handleError)
      );
  }

  getCategoryMedia(media: string | undefined): Observable<any> {
    const url = `${this.apiUrl}/genre/${media}/list?language=en&api_key=${this.apiKey}`;
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
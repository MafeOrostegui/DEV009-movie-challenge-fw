import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = '49a18f8a2dc1ca4105c158804e2ea08e';
  private apiUrl = 'https://api.themoviedb.org/3';
  private session_id: string | null = null;

  constructor(private http: HttpClient) { }

  setSessionId(sessionId: string) {
    this.session_id = sessionId;
  }

  getSessionId(): string | null {
    return this.session_id;
  }

  getToken(): Observable<string> {
    const url = `${this.apiUrl}/authentication/token/new?api_key=${this.apiKey}`;
    return this.http.get(url).pipe(
      tap((response: any) => {
        console.log('API Response:', response);
      }),
      map((response: any) => {
        if (response && response.request_token) {
          return response.request_token;
        } else {
          throw new Error('Unable to fetch authentication token.');
        }
      }),
      catchError(this.handleError)
    );
  }

  createSession(requestToken: string): Observable<any> {
    if (!requestToken) {
      throw new Error('Invalid request token.');
    }
    const url = `${this.apiUrl}/authentication/session/new?api_key=${this.apiKey}`;
    const requestData = {
      request_token: requestToken
    };

    return this.http.post(url, requestData).pipe(
      tap((response: any) => {
        console.log('API Response (Session):', response);
        if (response && response.session_id) {
          this.session_id = response.session_id;
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Server returned status code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}

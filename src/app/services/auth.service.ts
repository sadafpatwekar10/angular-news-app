import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURLAuth = environment.apiURL;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.apiURLAuth}/login`, {
        email,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => this.setSession(res))
      );
  }

  register(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.apiURLAuth}/register`, {
        email,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => this.setSession(res))
      );
  }

  private setSession(authResult: any) {
    const tokenDecode = JSON.parse(atob(authResult.access_token.split('.')[1]));
    localStorage.setItem('id_token', authResult.access_token);
    localStorage.setItem(
      'expires_at',
      JSON.stringify(tokenDecode.exp.valueOf())
    );
  }
  
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/auth']);
  }

  public isLoggedIn() {
    return !this.isTokenExpired();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  isTokenExpired() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration) {
      return Math.floor(new Date().getTime() / 1000) >= +expiration;
    } else return true;
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(errorMessage);
    } else {
      switch (errorRes.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists';
          break;
        case 'Incorrect email or password':
          errorMessage = 'Invalid email or Password';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist';
      }
      return throwError(errorMessage);
    }
  }
}

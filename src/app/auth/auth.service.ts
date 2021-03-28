import { Injectable } from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = this.sharedService.baseUrl;
  errorData: {};
  redirectUrl: string;

  isLoggedIn = false;

  constructor(
    private sharedService: SharedService,
    private http: HttpClient
  ) { }

  login = (email: string, password: string) => {
    return this.http.post<any>(this.baseUrl + '/api/auth/login', {email, password}).pipe(
        map(user => {
          if (user && user.access_token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.isLoggedIn = true;
          }
          console.log(user);
        }),
        catchError(this.handleError)
    );
  }

  isLogin = () => {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  logout = () => {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
  }

  getAuthorizationToken = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.access_token;
  }

  private handleError = (error: HttpResponse<any>) => {
    if (error instanceof ErrorEvent) {
      console.error('An error occurred:', error);
    } else {
      console.error(`Backend return code ${error.status}`);
    }
    this.errorData = {
      errorTitle: 'Oops! Request failed.',
      errorDesc: 'Something went wrong. Please try again later.'
    };
    return throwError(this.errorData);
  }
}

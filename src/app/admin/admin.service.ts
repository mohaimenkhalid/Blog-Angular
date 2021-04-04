import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SharedService} from '../shared/shared.service';
import {Blogpost} from '../blogpost/blogpost';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public baseUrl;
  errorData: {};

  constructor(private http: HttpClient, sharedService: SharedService) {
    this.baseUrl = sharedService.baseUrl;
  }

  getAllBlogs(): Observable<Blogpost[]> {
    return this.http.get<Blogpost[]>(this.baseUrl + '/api/all-blog-list').pipe(
      catchError(this.handleError)
    );
  }

  private handleError = (error: HttpResponse<any>) => {
    // @ts-ignore
    if (error.error instanceof ErrorEvent) {
      // @ts-ignore
      console.error('An error occurred:', error.error.message);
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

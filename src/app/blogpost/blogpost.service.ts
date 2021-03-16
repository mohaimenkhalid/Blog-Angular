import { Injectable } from '@angular/core';
import { Blogpost } from './blogpost';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  private baseUrl;
  errorData: {};

  constructor(private http: HttpClient, sharedService: SharedService) {
    this.baseUrl = sharedService.baseUrl;
  }

  getBlogs(): Observable<Blogpost[]> {
    return this.http.get<Blogpost[]>(this.baseUrl + 'api/all-blog-list').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpResponse<any>) {
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

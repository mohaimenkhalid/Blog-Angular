import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Blogpost} from '../blogpost/blogpost';
import {catchError} from 'rxjs/operators';
import {Category} from '../blogpost/category';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public serverUrl = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blogpost[]> {
    return this.http.get<Blogpost[]>(this.serverUrl + '/api/all-blog-list').pipe(
      catchError(this.handleError)
    );
  }

  getBlog(slug): Observable<Blogpost> {
    return this.http.get<Blogpost>(this.serverUrl + '/api/single-blog/' + slug).pipe(
      catchError(this.handleError)
    );
  }

  createBlog(blog): any {
    return this.http.post<any>(this.serverUrl + '/api/single-blog', blog)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateBlog(blog, id: number): any {
    return this.http.post<any>(this.serverUrl + '/api/single-blog/' + id, blog)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteBlog(id: number): any {
    return this.http.delete<any>(this.serverUrl + '/api/single-blog/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.serverUrl + '/api/all-category').pipe(
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
   /* this.errorData = {
      errorTitle: 'Oops! Request failed.',
      errorDesc: 'Something went wrong. Please try again later.'
    };*/
    return throwError(error);
  }
}

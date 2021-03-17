import { Component, OnInit } from '@angular/core';
import {BlogpostService} from '../blogpost.service';
import {Observable} from 'rxjs';
import {Category} from '../category';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-blogpost-categories',
  templateUrl: './blogpost-categories.component.html',
  styleUrls: ['./blogpost-categories.component.css']
})
export class BlogpostCategoriesComponent implements OnInit {

  public categories: Category[];
  error: {};

  constructor(private blogPostService: BlogpostService) { }

  ngOnInit(): void {
    this.blogPostService.getCategories()
      .subscribe((data: Category[]) => this.categories = data,
        error => this.error = error
      );
  }

}

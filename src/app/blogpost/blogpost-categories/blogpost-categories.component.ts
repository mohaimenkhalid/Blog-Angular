import { Component, OnInit } from '@angular/core';
import {BlogpostService} from '../blogpost.service';

@Component({
  selector: 'app-blogpost-categories',
  templateUrl: './blogpost-categories.component.html',
  styleUrls: ['./blogpost-categories.component.css']
})
export class BlogpostCategoriesComponent implements OnInit {

  constructor(private blogPostService: BlogpostService) { }

  ngOnInit(): void {

  }

}

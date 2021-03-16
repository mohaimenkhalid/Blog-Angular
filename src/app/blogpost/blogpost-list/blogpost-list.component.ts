import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Blogpost} from '../blogpost';
import {BlogpostService} from '../blogpost.service';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  title = 'All Blogs list';
  public blogs: Blogpost[];
  error: {};

  constructor(
    private titleService: Title,
    private blogPostService: BlogpostService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.blogPostService.getBlogs()
      .subscribe(
        (data: Blogpost[]) => this.blogs = data,
        error => this.error = error
        );
  }
}

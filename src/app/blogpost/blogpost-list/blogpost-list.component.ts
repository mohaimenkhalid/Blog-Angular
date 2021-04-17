import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Blogpost} from '../blogpost';
import {BlogpostService} from '../blogpost.service';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  public loader = true;
  title = 'All Blogs list';
  public blogs;
  public blogListDetails;
  error: {};

  constructor(
    private titleService: Title,
    private blogPostService: BlogpostService,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.blogPostService.getBlogs()
      .subscribe(
        (data) => {
          this.blogListDetails = data;
          this.blogs = data.data;
          this.loader = false;
        },
        error => this.error = error
        );
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  public blogPaginateJump = (url) => {
    this.blogPostService.getBlogPaginate(url)
      .subscribe(
        (data) => {
          this.blogListDetails = data;
          this.blogs = data.data;
        }
      );
  }
}

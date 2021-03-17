import { Component, OnInit } from '@angular/core';
import {BlogpostService} from '../blogpost.service';
import {Blogpost} from '../blogpost';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-blogpost-featured',
  templateUrl: './blogpost-featured.component.html',
  styleUrls: ['./blogpost-featured.component.css']
})
export class BlogpostFeaturedComponent implements OnInit {

  public blogs: Blogpost[];
  error: {};
  constructor(
    private blogPostService: BlogpostService,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.blogPostService.getBlogs()
      .subscribe((data: Blogpost[]) => this.blogs = data,
        error => this.error = error
      );
  }

}

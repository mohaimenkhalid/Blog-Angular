import { Component, OnInit } from '@angular/core';
import {BlogpostService} from '../blogpost.service';
import {SharedService} from '../../shared/shared.service';
import {Blogpost} from '../blogpost';

@Component({
  selector: 'app-blogpost-recent',
  templateUrl: './blogpost-recent.component.html',
  styleUrls: ['./blogpost-recent.component.css']
})
export class BlogpostRecentComponent implements OnInit {

  public blogs: Blogpost[];
  public error: {};

  constructor(
    private blogPostService: BlogpostService,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.blogPostService.getLatestBlog()
      .subscribe((data: Blogpost[]) => this.blogs = data,
        error => this.error = error
      );
  }

}

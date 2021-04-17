import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {Blogpost} from '../../blogpost/blogpost';
import {BlogService} from '../../services/blog.service';

@Component({
  selector: 'app-manage-blogs',
  templateUrl: './manage-blogs.component.html',
  styleUrls: ['./manage-blogs.component.css']
})
export class ManageBlogsComponent implements OnInit {

  public blogs = [];
  public loader = true;
  public blogListDetails;
  constructor(public blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(
      (data) => {
        this.blogs = data.data,
        this.blogListDetails = data;
        this.loader = false;
      },
      error => console.log(error)
    );
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  public blogPaginateJump = (url) => {
    this.blogService.getBlogPaginate(url)
      .subscribe(
        (data) => {
          this.blogListDetails = data;
          this.blogs = data.data;
        }
      );
  }

}

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

  public blogs: Blogpost[];
  public loader = true;
  constructor(public blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(
      (data) => {
        this.blogs = data,
        this.loader = false;
      },
      error => console.log(error)
    );
  }

}

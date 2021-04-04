import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {Blogpost} from '../../blogpost/blogpost';

@Component({
  selector: 'app-manage-blogs',
  templateUrl: './manage-blogs.component.html',
  styleUrls: ['./manage-blogs.component.css']
})
export class ManageBlogsComponent implements OnInit {

  public blogs: Blogpost[];
  public loader = true;
  constructor(public adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllBlogs().subscribe(
      (data) => {
        this.blogs = data,
        this.loader = false;
      },
      error => console.log(error)
    );
  }

}

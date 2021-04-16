import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import { Title } from '@angular/platform-browser';
import {BlogpostService} from '../blogpost.service';
import {Blogpost} from '../blogpost';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-blogpost-details',
  templateUrl: './blogpost-details.component.html',
  styleUrls: ['./blogpost-details.component.css']
})
export class BlogpostDetailsComponent implements OnInit {
  public blog$;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogPostService: BlogpostService,
    private titleService: Title,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.blogPostService.getBlog(params.get('slug'))
        .subscribe((data) => {
          this.blog$ = data;
          this.setTitle(data);
        });
    });
  }

  setTitle = (data) => {
    if (data) {
      this.titleService.setTitle(this.blog$.blog.title);
    }
  }
}

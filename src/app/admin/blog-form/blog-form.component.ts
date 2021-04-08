import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  error: string;
  uploadError: string;
  imagePath: string;
  blogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.blogService.getBlog(+slug).subscribe(
        res => {
          this.blogForm.patchValue({
            title: res.title,
            body: res.title,
            user_id: res.user_id,
            id: res.id
          });
          this.imagePath = res.cover_image_url;
        }
      );
    }

    this.blogForm = this.fb.group({
      id: [''],
      user_id: ['', Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required],
      category: ['', Validators.required],
      cover_image: ['', Validators.required],
    });
  }

}

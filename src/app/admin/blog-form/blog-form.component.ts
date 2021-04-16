import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

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

  categoryList = [];
  dropdownSettings = {};

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.blogService.getCategories().subscribe(
      (data) => {
        this.categoryList = data;
      },
      error => console.log(error)
    );

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };



    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.blogService.getBlog(+slug).subscribe(
        res => {
          this.blogForm.patchValue({
            id: res.id,
            title: res.title,
            body: res.title,
            user_id: res.user_id,
            category_id: res.blog_category
          });
          this.imagePath = res.cover_image_url;
        }
      );
    }

    this.blogForm = this.fb.group({
      id: [''],
      user_id: [this.authService.getAuthUserId()],
      title: ['', Validators.required],
      body: ['', Validators.required],
      category_id: [[], Validators.required],
      cover_image_validation: ['', Validators.required],
      cover_image: ['']
    });
  }

  get title() { return this.blogForm.get('title'); }
  get body() { return this.blogForm.get('body'); }
  get category() { return this.blogForm.get('category_id'); }
  get coverImage() { return this.blogForm.get('cover_image_validation'); }

  onSelectedFile = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      if (file.size < 2111775) {
        reader.onloadend = (loadedFile) => {
          this.blogForm.get('cover_image').setValue(loadedFile.target.result);
        };
        reader.readAsDataURL(file);
      }else {
        alert('File size can not be bigger than 2 MB');
      }
    }
  }

  onSubmit() {

    const id = this.blogForm.get('id').value;

    if (id) {
      this.blogService.updateBlog(this.blogForm.value, +id)
        .subscribe(res => {
          if (res.error) {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/blogs']);
          }
        }, error => this.error = error);
    } else {
      this.blogService.createBlog(this.blogForm.value).subscribe(
        res => {
          if (res.success) {
             this.toastr.success('Blog created successfully.!', 'Success!');
             this.router.navigate(['/admin/blogs']);
          } else {
             this.uploadError = 'Something went wrong';
          }
        }, error => this.error = error);
    }
  }

}

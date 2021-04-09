import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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
    private route: ActivatedRoute
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
      itemsShowLimit: 3,
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
      cover_image: ['']
    });
  }

  /*onItemSelect(item: any) {
    console.log('selectedCategories', item);
  }*/

  get title() { return this.blogForm.get('title'); }
  get body() { return this.blogForm.get('body'); }
  get category() { return this.blogForm.get('category_id'); }

  onSelectedFile = (event) => {
    if (event.target.file.length > 0) {
      const file = event.target.file[0];
      this.blogForm.get('cover_image').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.blogForm.get('title').value);
    formData.append('body', this.blogForm.get('body').value);
    formData.append('category_id', this.blogForm.get('category_id').value);
    formData.append('cover_image', this.blogForm.get('cover_image').value);
    formData.append('user_id', this.blogForm.get('user_id').value);

    const id = this.blogForm.get('id').value;

    if (id) {
      this.blogService.updateBlog(formData, +id)
        .subscribe(res => {
          if (res.error) {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/blogs']);
          }
        }, error => this.error = error);
    } else {
      this.blogService.createBlog(formData).subscribe(
        res => {
          if (res.success) {
             this.router.navigate(['/admin/blogs']);
          } else {
             this.uploadError = 'Something went wrong';
          }
        }, error => this.error = error);
    }
  }

}

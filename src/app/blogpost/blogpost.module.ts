import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogpostRoutingModule } from './blogpost-routing.module';
import { BlogpostFeaturedComponent } from './blogpost-featured/blogpost-featured.component';
import { BlogpostListComponent } from './blogpost-list/blogpost-list.component';
import { BlogpostDetailsComponent } from './blogpost-details/blogpost-details.component';
import { BlogpostRecentComponent } from './blogpost-recent/blogpost-recent.component';
import { BlogpostCategoriesComponent } from './blogpost-categories/blogpost-categories.component';

@NgModule({
  declarations: [BlogpostFeaturedComponent, BlogpostListComponent, BlogpostDetailsComponent, BlogpostRecentComponent, BlogpostCategoriesComponent],
  imports: [
    CommonModule,
    BlogpostRoutingModule
  ],
  exports: [
    BlogpostFeaturedComponent,
    BlogpostListComponent,
    BlogpostDetailsComponent,
    BlogpostRecentComponent,
    BlogpostCategoriesComponent
  ]
})
export class BlogpostModule { }

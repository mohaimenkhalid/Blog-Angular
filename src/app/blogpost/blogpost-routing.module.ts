import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BlogpostListComponent} from './blogpost-list/blogpost-list.component';
import {BlogpostDetailsComponent} from './blogpost-details/blogpost-details.component';

const routes: Routes = [
  { path: 'blog', component: BlogpostListComponent },
  { path: 'blog/:id', component: BlogpostDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogpostRoutingModule { }

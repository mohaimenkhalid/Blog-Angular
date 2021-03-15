import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogpostFeaturedComponent} from './blogpost/blogpost-featured/blogpost-featured.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

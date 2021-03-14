import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
/*  {path: 'home', component: HeaderComponent},
  {path: 'about', component: IntroComponent},
  {path: 'services', component: ContentComponent},
  {path: 'testimonials', component: TestimonialComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'client', component: ClientComponent},
  {path: 'pricing', component: PricingComponent},*/
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [];

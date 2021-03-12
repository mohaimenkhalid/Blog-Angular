import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {IntroComponent} from './intro/intro.component';
import {ContentComponent} from './content/content.component';
import {TestimonialComponent} from './testimonial/testimonial.component';
import {GalleryComponent} from './gallery/gallery.component';
import {ClientComponent} from './client/client.component';
import {PricingComponent} from './pricing/pricing.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HeaderComponent},
  {path: 'about', component: IntroComponent},
  {path: 'services', component: ContentComponent},
  {path: 'testimonials', component: TestimonialComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'client', component: ClientComponent},
  {path: 'pricing', component: PricingComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  IntroComponent,
  GalleryComponent,
  ContentComponent,
  TestimonialComponent,
  ClientComponent,
  PricingComponent,
  HeaderComponent
];

import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogpostModule } from './blogpost/blogpost.module';
import { CmspageModule } from './cmspage/cmspage.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import {httpInterceptorProviders} from './http-interceptors';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BlogpostModule,
    CmspageModule,
    AdminModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [Title, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

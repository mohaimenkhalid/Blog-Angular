import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminBlogsComponent } from './admin-blogs/admin-blogs.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { ManageBlogsComponent } from './manage-blogs/manage-blogs.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';


@NgModule({
  declarations: [AdminComponent, AdminDashboardComponent, AdminBlogsComponent, AdminCategoriesComponent, AdminPagesComponent, ManageBlogsComponent, ManageCategoriesComponent, ManagePagesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

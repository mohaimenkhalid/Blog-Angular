import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import {AdminComponent} from './admin/admin.component';
import {ManageBlogsComponent} from './manage-blogs/manage-blogs.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, /*canActivate: [AuthGuard],*/
    children: [
      { path: '',
        children: [
          { path: 'blogs', component: ManageBlogsComponent},
          { path: 'categories', component: ManageBlogsComponent},
          { path: '', component: AdminDashboardComponent},
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { UserStartComponent } from './user-start/user-start.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserUpdateRoleComponent } from './user-update-role/user-update-role.component';
import { AdminResolverService } from './admin-resolver.service';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '', component: UserStartComponent },
      {
        path: ':id',
        component: UserDetailComponent,
        resolve: [AdminResolverService],
      },
      {
        path: ':id/updateRole',
        component: UserUpdateRoleComponent,
        resolve: [AdminResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-list/user-item/user-item.component';
import { UserStartComponent } from './user-start/user-start.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserUpdateRoleComponent } from './user-update-role/user-update-role.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminComponent,
    UserListComponent,
    UserItemComponent,
    UserStartComponent,
    UserDetailComponent,
    UserUpdateRoleComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule,
  ],
})
export class AdminModule {}

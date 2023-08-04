import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecordsComponent } from './records/records.component';
import { RecordStartComponent } from './record-start/record-start.component';
import { RecordDetailComponent } from './record-detail/record-detail.component';
import { RecordsResolverService } from './records-resolver.service';
import { RecordEditComponent } from './record-edit/record-edit.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: RecordsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecordStartComponent },
      { path: 'new', component: RecordEditComponent },
      {
        path: ':id',
        component: RecordDetailComponent,
        resolve: [RecordsResolverService],
      },
      {
        path: ':id/edit',
        component: RecordEditComponent,
        resolve: [RecordsResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordsRoutingModule {}

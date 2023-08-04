import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReadersComponent } from './readers/readers.component';
import { ReaderStartComponent } from './reader-start/reader-start.component';
import { ReaderEditComponent } from './reader-edit/reader-edit.component';
import { ReaderDetailComponent } from './reader-detail/reader-detail.component';
import { ReadersResolverService } from './readers-resolver.service';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ReadersComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ReaderStartComponent },
      { path: 'new', component: ReaderEditComponent },
      {
        path: ':id',
        component: ReaderDetailComponent,
        resolve: [ReadersResolverService],
      },
      {
        path: ':id/edit',
        component: ReaderEditComponent,
        resolve: [ReadersResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadersRoutingModule {}

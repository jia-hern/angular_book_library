import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BooksComponent } from './books/books.component';
import { BookStartComponent } from './book-start/book-start.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BooksResolverService } from './books-resolver.service';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: BookStartComponent },
      { path: 'new', component: BookEditComponent },
      {
        path: ':id',
        component: BookDetailComponent,
        resolve: [BooksResolverService],
      },
      {
        path: ':id/edit',
        component: BookEditComponent,
        resolve: [BooksResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}

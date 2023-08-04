import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { BooksComponent } from './books/books.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { BookStartComponent } from './book-start/book-start.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';

import { BooksRoutingModule } from './books-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BooksComponent,
    BookListComponent,
    BookItemComponent,
    BookStartComponent,
    BookDetailComponent,
    BookEditComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    SharedModule,
  ],
})
export class BooksModule {}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Book } from '../book.model';
import * as fromApp from '../../store/app.reducer';
import * as BooksActions from '../store/book.actions';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  book: Book;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('books');
        }),
        map((booksState) => {
          return booksState.books.find((book, index) => {
            return book.id === this.id;
          });
        })
      )
      .subscribe((book) => {
        this.book = book;
      });

    this.loggingService.printLog('BookDetailComponent initialized');
  }

  onEditBook() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteBook() {
    this.store.dispatch(BooksActions.deleteBook({ id: this.id }));
    this.store.dispatch(BooksActions.getAllBooks());

    this.router.navigate(['/books']);
  }
  ngOnDestroy() {
    this.store.dispatch(BooksActions.getAllBooks());
  }
}

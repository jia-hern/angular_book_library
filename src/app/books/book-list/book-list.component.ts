import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Book } from '../book.model';
import * as fromApp from '../../store/app.reducer';
import { LoggingService } from 'src/app/logging.service';
import * as BooksActions from '../store/book.actions';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.store.dispatch(BooksActions.getAllBooks());

    this.subscription = this.store
      .select('books')
      .pipe(map((booksState) => booksState.books))
      .subscribe((books: Book[]) => {
        this.books = books;
      });

    this.loggingService.printLog('BookListComponent initialized');
  }

  goToNewBook() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

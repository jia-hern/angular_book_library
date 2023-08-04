import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoggingService } from 'src/app/logging.service';
import * as fromApp from '../../store/app.reducer';
import * as BooksActions from '../store/book.actions';

@Component({
  selector: 'app-book-start',
  templateUrl: './book-start.component.html',
  styleUrls: ['./book-start.component.css'],
})
export class BookStartComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {}
  ngOnInit() {
    this.store.dispatch(BooksActions.getAllBooks());
    this.loggingService.printLog('BookStartComponent initialized');
  }
}

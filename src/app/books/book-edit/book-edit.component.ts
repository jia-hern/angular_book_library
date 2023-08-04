import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as BooksActions from '../store/book.actions';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  bookForm: FormGroup;

  private storeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initializeForm();
    });
    this.loggingService.printLog('BookEditComponent initialized');
  }
  onSubmit() {
    let book = this.bookForm.value;
    if (this.editMode) {
      book.id = this.id;
    }
    this.store.dispatch(BooksActions.saveBook({ book }));
    this.onNavigateBack();
  }
  onNavigateBack() {
    this.store.dispatch(BooksActions.getAllBooks());
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
    this.store.dispatch(BooksActions.getAllBooks());
  }
  private initializeForm() {
    let bookTitle = '';
    let bookDescription = '';

    if (this.editMode) {
      this.storeSubscription = this.store
        .select('books')
        .pipe(
          map((bookState) => {
            return bookState.books.find((book, index) => {
              return book.id === this.id;
            });
          })
        )
        .subscribe((book) => {
          bookTitle = book.title;
          bookDescription = book.description;
        });
    }
    this.bookForm = new FormGroup({
      title: new FormControl(bookTitle, Validators.required),
      description: new FormControl(bookDescription, Validators.required),
    });
  }
}

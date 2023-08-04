import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as RecordActions from '../store/record.actions';
import * as ReaderActions from '../../readers/store/reader.actions';
import * as BooksActions from '../../books/store/book.actions';
import { LoggingService } from 'src/app/logging.service';
import { Reader } from '../../readers/reader.model';
import { Book } from '../../books/book.model';

@Component({
  selector: 'app-record-edit',
  templateUrl: './record-edit.component.html',
  styleUrls: ['./record-edit.component.css'],
})
export class RecordEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recordForm: FormGroup;
  private activityOptions = ['borrow', 'return'];
  private readerOptions = [];
  private bookOptions = [];
  private storeSubscription: Subscription;
  private readerSubscription: Subscription;
  private bookSubscription: Subscription;

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
      this.initializeReaders();
      this.initializeBooks();
      this.initializeForm();
    });
    this.loggingService.printLog('RecordEditComponent initialized');
  }
  onSubmit() {
    let record = this.recordForm.value;
    if (this.editMode) {
      record.id = this.id;
    }
    this.store.dispatch(
      RecordActions.saveRecord({
        record,
      })
    );
    this.onNavigateBack();
  }
  onNavigateBack() {
    this.store.dispatch(RecordActions.getAllRecords());
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.store.dispatch(RecordActions.getAllRecords());
    if (this.storeSubscription) this.storeSubscription.unsubscribe();
    if (this.readerSubscription) this.readerSubscription.unsubscribe();
    if (this.bookSubscription) this.bookSubscription.unsubscribe();
  }
  private initializeForm() {
    let recordActivity = null;
    let recordReaderId = null;
    let recordBookId = null;

    if (this.editMode) {
      this.storeSubscription = this.store
        .select('records')
        .pipe(
          map((recordState) => {
            return recordState.records.find((record, index) => {
              return record.id === this.id;
            });
          })
        )
        .subscribe((record) => {
          recordActivity = record.activity;
          recordReaderId = record.reader.id;
          recordBookId = record.book.id;
        });
    }
    this.recordForm = new FormGroup({
      activity: new FormControl(recordActivity, Validators.required),
      readerId: new FormControl(recordReaderId, Validators.required),
      bookId: new FormControl(recordBookId, Validators.required),
    });
  }

  get activityOptionsArray() {
    return this.activityOptions;
  }
  get readerOptionsArray() {
    return <Reader[]>this.readerOptions;
  }
  get bookOptionsArray() {
    return <Book[]>this.bookOptions;
  }
  private initializeReaders() {
    this.store.dispatch(ReaderActions.getAllReaders());
    this.readerSubscription = this.store
      .select('readers')
      .pipe(
        map((readerState) => {
          return readerState.readers;
        })
      )
      .subscribe((readers: Reader[]) => {
        this.readerOptions = readers.slice();
      });
  }
  private initializeBooks() {
    this.store.dispatch(BooksActions.getAllBooks());
    this.bookSubscription = this.store
      .select('books')
      .pipe(
        map((bookState) => {
          return bookState.books;
        })
      )
      .subscribe((books: Book[]) => {
        this.bookOptions = books.slice();
      });
  }
}

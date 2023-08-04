import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

import * as BookActions from './book.actions';
import { Book } from '../book.model';

@Injectable()
export class BookEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  getBooks = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.getAllBooks),
      switchMap(() => {
        const url = '/api/book/all';
        return this.http.get<Book[]>(url);
      }),
      map((books) => {
        return BookActions.setBooks({ books });
      })
    )
  );

  getBooksByReaderId = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.getAllBooksByReaderId),
      switchMap((action) => {
        const url = `/api/reader/all/${action.readerId}/book`;
        return this.http.get<Book[]>(url);
      }),
      map((books) => {
        return BookActions.setBooks({ books });
      })
    )
  );

  getBook = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookActions.getBook),
        switchMap((action) => {
          const url = `/api/book/${action.id}`;
          return this.http.get<Book>(url);
        })
      ),
    { dispatch: false }
  );

  getBookByRecordId = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookActions.getBookByRecordId),
        switchMap((action) => {
          const url = `/api/book/${action.recordId}/record`;
          return this.http.get<Book>(url);
        })
      ),
    { dispatch: false }
  );

  saveBook = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookActions.saveBook),
        switchMap((action) => {
          const url = '/api/book/';
          return this.http.post<Book>(url, action.book);
        })
      ),
    { dispatch: false }
  );

  deleteBook = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookActions.deleteBook),
        switchMap((action) => {
          const url = `/api/book/${action.id}`;
          return this.http.delete<Book>(url);
        })
      ),
    { dispatch: false }
  );

  assignReaderToBook = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookActions.assignReaderToBook),
        switchMap((action) => {
          const url = `/api/book/${action.bookId}/reader/${action.readerId}`;
          return this.http.put<Book>(url, {});
        })
      ),
    { dispatch: false }
  );
}

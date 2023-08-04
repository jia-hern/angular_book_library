import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

import * as ReaderActions from './reader.actions';
import { Reader } from '../reader.model';

@Injectable()
export class ReaderEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  getReaders = createEffect(() =>
    this.actions$.pipe(
      ofType(ReaderActions.getAllReaders),
      switchMap(() => {
        const url = '/api/reader/all';
        return this.http.get<Reader[]>(url);
      }),
      map((readers) => {
        return ReaderActions.setReaders({ readers });
      })
    )
  );

  getReadersByBookId = createEffect(() =>
    this.actions$.pipe(
      ofType(ReaderActions.getAllReadersByBookId),
      switchMap((action) => {
        const url = `/api/reader/all/${action.bookId}/book`;
        return this.http.get<Reader[]>(url);
      }),
      map((readers) => {
        return ReaderActions.setReaders({ readers });
      })
    )
  );

  getReader = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReaderActions.getReader),
        switchMap((action) => {
          const url = `/api/reader/${action.id}`;
          return this.http.get<Reader>(url);
        })
      ),
    { dispatch: false }
  );

  saveReader = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReaderActions.saveReader),
        switchMap((action) => {
          const url = '/api/reader/';
          return this.http.post<Reader>(url, action.reader);
        })
      ),
    { dispatch: false }
  );

  deleteReader = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReaderActions.deleteReader),
        switchMap((action) => {
          const url = `/api/reader/${action.id}`;
          return this.http.delete<Reader>(url);
        })
      ),
    { dispatch: false }
  );
}

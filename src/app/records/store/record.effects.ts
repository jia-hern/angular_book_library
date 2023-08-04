import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

import { Record } from '../record.model';
import * as RecordActions from './record.actions';

@Injectable()
export class RecordEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  getRecords = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.getAllRecords),
      switchMap(() => {
        const url = '/api/record/all';
        return this.http.get<Record[]>(url);
      }),
      map((records) => {
        return RecordActions.setRecords({ records });
      })
    )
  );

  getRecordsByBookId = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.getAllRecordsByBookId),
      switchMap((action) => {
        const url = `/api/record/all/${action.bookId}/book`;
        return this.http.get<Record[]>(url);
      }),
      map((records) => {
        return RecordActions.setRecords({ records });
      })
    )
  );

  getRecordsByReaderId = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.getAllRecordsByReaderId),
      switchMap((action) => {
        const url = `/api/record/all/${action.readerId}/reader`;
        return this.http.get<Record[]>(url);
      }),
      map((records) => {
        return RecordActions.setRecords({ records });
      })
    )
  );

  getRecord = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecordActions.getRecord),
        switchMap((action) => {
          const url = `/api/record/${action.id}`;
          return this.http.get<Record[]>(url);
        })
      ),
    { dispatch: false }
  );

  getRecordByReaderAndBookId = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecordActions.getRecordByReaderAndBookId),
        switchMap((action) => {
          const url = `/api/record/${action.readerId}/reader/${action.bookId}/book`;
          return this.http.get<Record[]>(url);
        })
      ),
    { dispatch: false }
  );

  saveRecord = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecordActions.saveRecord),
        switchMap((action) => {
          const url = `/api/record/${action.record.readerId}/reader/${action.record.bookId}/book`;
          return this.http.post<Record[]>(url, action.record);
        })
      ),
    { dispatch: false }
  );

  deleteRecord = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecordActions.deleteRecord),
        switchMap((action) => {
          const url = `/api/record/${action.id}`;
          return this.http.delete<Record[]>(url);
        })
      ),
    { dispatch: false }
  );

  deleteRecordByReaderAndBookId = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecordActions.deleteRecordByReaderAndBookId),
        switchMap((action) => {
          const url = `/api/record/${action.readerId}/reader/${action.bookId}/book`;
          return this.http.delete<Record[]>(url);
        })
      ),
    { dispatch: false }
  );
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Record } from './record.model';
import * as fromApp from '../store/app.reducer';
import * as RecordsActions from './store/record.actions';

@Injectable({ providedIn: 'root' })
export class RecordsResolverService implements Resolve<Record[]> {
  constructor(private store: Store<fromApp.AppState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Record[] | Observable<Record[]> | Promise<Record[]> {
    return this.store.select('records').pipe(
      take(1),
      map((recordState) => {
        return recordState.records;
      }),
      switchMap((records) => {
        if (records.length === 0) {
          this.store.dispatch(RecordsActions.getAllRecords());
          return of([]);
        } else {
          return of(records);
        }
      })
    );
  }
}

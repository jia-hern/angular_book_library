import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Reader } from './reader.model';
import * as fromApp from '../store/app.reducer';
import * as ReadersActions from './store/reader.actions';

@Injectable({ providedIn: 'root' })
export class ReadersResolverService implements Resolve<Reader[]> {
  constructor(private store: Store<fromApp.AppState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Reader[] | Observable<Reader[]> | Promise<Reader[]> {
    return this.store.select('readers').pipe(
      take(1),
      map((readerState) => {
        return readerState.readers;
      }),
      switchMap((readers) => {
        if (readers.length === 0) {
          this.store.dispatch(ReadersActions.getAllReaders());
          return of([]);
        } else {
          return of(readers);
        }
      })
    );
  }
}

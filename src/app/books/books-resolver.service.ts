import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Book } from './book.model';
import * as fromApp from '../store/app.reducer';
import * as BooksActions from './store/book.actions';

@Injectable({ providedIn: 'root' })
export class BooksResolverService implements Resolve<Book[]> {
  constructor(private store: Store<fromApp.AppState>) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('books').pipe(
      take(1),
      map((bookState) => {
        return bookState.books;
      }),
      switchMap((books) => {
        if (books.length === 0) {
          this.store.dispatch(BooksActions.getAllBooks());
          return of([]);
        } else {
          return of(books);
        }
      })
    );
  }
}

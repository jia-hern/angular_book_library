import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { User } from '../shared/models/user.model';
import * as fromApp from '../store/app.reducer';
import * as AdminActions from './store/admin.actions';

@Injectable({ providedIn: 'root' })
export class AdminResolverService implements Resolve<User[]> {
  constructor(private store: Store<fromApp.AppState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User[] | Observable<User[]> | Promise<User[]> {
    return this.store.select('admin').pipe(
      take(1),
      map((adminState) => {
        return adminState.users;
      }),
      switchMap((users) => {
        if (users.length === 0) {
          this.store.dispatch(AdminActions.getAllUsers());
          return of([]);
        } else {
          return of(users);
        }
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

import { User } from '../../shared/models/user.model';
import * as AdminActions from './admin.actions';

@Injectable()
export class AdminEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  getUsers = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.getAllUsers),
      switchMap(() => {
        const url = '/api/admin/all';
        return this.http.get<User[]>(url);
      }),
      map((users) => {
        return AdminActions.setUsers({ users });
      })
    )
  );

  updateRole = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.updateRole),
        switchMap((action) => {
          const url = `/api/admin/${action.userId}`;
          return this.http.post<string>(url, action.role);
        })
      ),
    { dispatch: false }
  );

  deleteUser = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.deleteUser),
        switchMap((action) => {
          const url = `/api/admin/${action.id}`;
          return this.http.delete(url);
        })
      ),
    { dispatch: false }
  );

  getUser = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminActions.getUser),
        switchMap((action) => {
          const url = `/api/user/${action.id}`;
          return this.http.get<string>(url);
        })
      ),
    { dispatch: false }
  );
}

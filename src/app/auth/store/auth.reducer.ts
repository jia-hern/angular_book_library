import { createReducer, on } from '@ngrx/store';

import { User } from '../../shared/models/user.model';
import * as AuthActions from './auth.actions';
import { HttpErrorResponse } from '@angular/common/http';

export interface State {
  user: User;
  authError: HttpErrorResponse;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.authenticateSuccess, (state, action) => {
    const user = new User(
      action.username,
      action.role,
      action.token,
      action.expirationDate
    );

    return {
      ...state,
      authError: null,
      user,
      loading: false,
    };
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(AuthActions.loginStart, (state) => {
    return {
      ...state,
      authError: null,
      loading: true,
    };
  }),
  on(AuthActions.authenticateFail, (state, action) => {
    return {
      ...state,
      user: null,
      authError: action.error,
      loading: false,
    };
  }),
  on(AuthActions.clearError, (state) => {
    return {
      ...state,
      authError: null,
      loading: false,
    };
  })
);

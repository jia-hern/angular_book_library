import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const authenticateSuccess = createAction(
  '[Auth] Success',
  props<{
    username: string;
    role: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }>()
);

export const logout = createAction('[Auth] Logout');

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{ username: string; password: string }>()
);

export const authenticateFail = createAction(
  '[Auth] Login Fail',
  props<{ error: HttpErrorResponse }>()
);

export const signupStart = createAction(
  '[Auth] Signup Start',
  props<{ username: string; password: string }>()
);

export const clearError = createAction('[Auth] Clear Error');

export const autoLogin = createAction('[Auth] Auto Login');

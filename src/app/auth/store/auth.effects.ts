import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as AuthActions from './auth.actions';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../auth.service';

const handleAuthentication = (
  username: string,
  role: string,
  expireInEpoch: number,
  token: string
) => {
  const expirationDate = new Date(expireInEpoch * 1000);
  const user = new User(username, role, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  localStorage.setItem('token', token);
  return AuthActions.authenticateSuccess({
    username,
    role,
    token,
    expirationDate,
    redirect: true,
  });
};

const handleError = (errorRes: any) => {
  return of(AuthActions.authenticateFail({ error: errorRes }));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap((signupAction) => {
        const url = '/api/user/register';
        return this.http
          .post<any>(
            url,
            {
              username: signupAction.username,
              password: signupAction.password,
            },
            { observe: 'response' }
          )
          .pipe(
            map((resData) => {
              if (!resData.ok) {
                return { type: 'DUMMY' };
              }
              return AuthActions.loginStart({
                username: signupAction.username,
                password: signupAction.password,
              });
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap((loginAction) => {
        const url = '/api/user/authenticate';
        return this.http
          .post<any>(
            url,
            {
              username: loginAction.username,
              password: loginAction.password,
            },
            { observe: 'response' }
          )
          .pipe(
            map((resData) => {
              let jwt = resData.headers.get('Authorization');
              let payload = this.authService.parseJwt(jwt);
              payload.jwt = jwt;
              return <{ sub: string; roles: string; exp: string; jwt: string }>(
                payload
              );
            }),
            tap((payload) => {
              const expInMs = +payload.exp * 1000;
              const expirationDuration = expInMs - new Date().getTime();
              this.authService.setLogoutTimer(expirationDuration);
            }),
            map((payload) => {
              return handleAuthentication(
                payload.sub,
                payload.roles,
                +payload.exp,
                payload.jwt
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess),
        tap((authSuccessAction) => {
          if (authSuccessAction.redirect) {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const userData: {
          username: string;
          role: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
          return { type: 'DUMMY' };
        }
        userData._token = localStorage.getItem('token');

        const loadedUser = new User(
          userData.username,
          userData.role,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return AuthActions.authenticateSuccess({
            username: loadedUser.username,
            role: loadedUser.role,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false,
          });
        }
        return { type: 'DUMMY' };
      })
    )
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          localStorage.removeItem('token');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
}

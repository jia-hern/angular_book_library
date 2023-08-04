import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private authSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      if (authState.authError) this.error = authState.authError.error;
      else this.error = null;
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(AuthActions.loginStart({ username, password }));
    } else {
      this.store.dispatch(AuthActions.signupStart({ username, password }));
    }
    form.reset();
  }

  onHandleError() {
    this.store.dispatch(AuthActions.clearError());
  }

  ngOnDestroy() {
    if (this.authSub) this.authSub.unsubscribe();
  }
}

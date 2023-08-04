import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import * as BookActions from '../books/store/book.actions';
import * as ReaderActions from '../readers/store/reader.actions';
import * as RecordActions from '../records/store/record.actions';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isAdmin = false;
  private userSub: Subscription;
  username = '';

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
        if (!!user) {
          this.username = user.username;
          this.isAdmin = user.role.includes('ROLE_admin');
        }
      });
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  onFetchData() {
    this.store.dispatch(BookActions.getAllBooks());
    this.store.dispatch(ReaderActions.getAllReaders());
    this.store.dispatch(RecordActions.getAllRecords());
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}

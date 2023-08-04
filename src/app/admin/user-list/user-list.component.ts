import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { User } from '../../shared/models/user.model';
import * as fromApp from '../../store/app.reducer';
import { LoggingService } from 'src/app/logging.service';
import * as AdminActions from '../store/admin.actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.store.dispatch(AdminActions.getAllUsers());

    this.subscription = this.store
      .select('admin')
      .pipe(map((adminState) => adminState.users))
      .subscribe((users: User[]) => {
        this.users = users;
      });
    this.loggingService.printLog('UserListComponent initialized');
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

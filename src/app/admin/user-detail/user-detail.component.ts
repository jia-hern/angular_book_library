import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { User } from '../../shared/models/user.model';
import * as fromApp from '../../store/app.reducer';
import * as AdminActions from '../store/admin.actions';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.store.dispatch(AdminActions.getAllUsers());

    this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('admin');
        }),
        map((adminState) => {
          return adminState.users.find((user, index) => {
            return user.id === this.id;
          });
        })
      )
      .subscribe((user) => {
        this.user = user;
      });
    this.loggingService.printLog('UserDetailComponent initialized');
  }
  onUpdateRole() {
    this.router.navigate(['updateRole'], { relativeTo: this.route });
  }
  onDeleteUser() {
    this.store.dispatch(AdminActions.deleteUser({ id: this.id }));
    this.store.dispatch(AdminActions.getAllUsers());

    this.router.navigate(['/admin']);
  }
  ngOnDestroy() {
    this.store.dispatch(AdminActions.getAllUsers());
  }
}

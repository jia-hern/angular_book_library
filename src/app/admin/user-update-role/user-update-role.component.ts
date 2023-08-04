import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as AdminActions from '../store/admin.actions';
import { LoggingService } from 'src/app/logging.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-user-update-role',
  templateUrl: './user-update-role.component.html',
  styleUrls: ['./user-update-role.component.css'],
})
export class UserUpdateRoleComponent implements OnInit, OnDestroy {
  id: number;
  userForm: FormGroup;
  private roleOptions = ['user', 'admin'];
  private storeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.initializeForm();
    });
    this.loggingService.printLog('UserUpdateRoleComponent initialized');
  }
  onSubmit() {
    let role = this.userForm.value;
    this.store.dispatch(AdminActions.updateRole({ userId: this.id, role }));
    this.onNavigateBack();
  }
  onNavigateBack() {
    this.store.dispatch(AdminActions.getAllUsers());
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.store.dispatch(AdminActions.getAllUsers());
    if (this.storeSubscription) this.storeSubscription.unsubscribe();
  }
  private initializeForm() {
    let existingRole = null;
    this.storeSubscription = this.store
      .select('admin')
      .pipe(
        map((adminState) => {
          return adminState.users.find((user, index) => {
            return user.id === this.id;
          });
        })
      )
      .subscribe((user) => {
        existingRole = user.role;
      });
    this.userForm = new FormGroup({
      role: new FormControl(existingRole, Validators.required),
    });
  }
  get roleOptionsArray() {
    return this.roleOptions;
  }
}

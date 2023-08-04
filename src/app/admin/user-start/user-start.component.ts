import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoggingService } from 'src/app/logging.service';
import * as fromApp from '../../store/app.reducer';
import * as AdminActions from '../store/admin.actions';

@Component({
  selector: 'app-user-start',
  templateUrl: './user-start.component.html',
  styleUrls: ['./user-start.component.css'],
})
export class UserStartComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {}
  ngOnInit() {
    this.store.dispatch(AdminActions.getAllUsers());
    this.loggingService.printLog('UserStartComponent initialized');
  }
}

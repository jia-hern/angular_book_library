import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoggingService } from 'src/app/logging.service';
import * as fromApp from '../../store/app.reducer';
import * as RecordsActions from '../store/record.actions';

@Component({
  selector: 'app-record-start',
  templateUrl: './record-start.component.html',
  styleUrls: ['./record-start.component.css'],
})
export class RecordStartComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {}
  ngOnInit() {
    this.store.dispatch(RecordsActions.getAllRecords());
    this.loggingService.printLog('RecordStartComponent initialized');
  }
}

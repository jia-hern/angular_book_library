import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoggingService } from 'src/app/logging.service';
import * as fromApp from '../../store/app.reducer';
import * as ReadersActions from '../store/reader.actions';
@Component({
  selector: 'app-reader-start',
  templateUrl: './reader-start.component.html',
  styleUrls: ['./reader-start.component.css'],
})
export class ReaderStartComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {}
  ngOnInit() {
    this.store.dispatch(ReadersActions.getAllReaders());
    this.loggingService.printLog('ReadersStartComponent initialized');
  }
}

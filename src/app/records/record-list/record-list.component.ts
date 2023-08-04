import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Record } from '../record.model';
import * as fromApp from '../../store/app.reducer';
import { LoggingService } from 'src/app/logging.service';
import * as RecordsActions from '../store/record.actions';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css'],
})
export class RecordListComponent implements OnInit, OnDestroy {
  records: Record[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.store.dispatch(RecordsActions.getAllRecords());

    this.subscription = this.store
      .select('records')
      .pipe(map((recordsState) => recordsState.records))
      .subscribe((records: Record[]) => {
        this.records = records;
      });
    this.loggingService.printLog('RecordListComponent initialized');
  }

  goToNewRecord() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

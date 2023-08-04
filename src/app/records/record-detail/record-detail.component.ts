import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Record } from '../record.model';
import * as fromApp from '../../store/app.reducer';
import * as RecordsActions from '../store/record.actions';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css'],
})
export class RecordDetailComponent implements OnInit, OnDestroy {
  record: Record;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('records');
        }),
        map((recordsState) => {
          return recordsState.records.find((record, index) => {
            return record.id === this.id;
          });
        })
      )
      .subscribe((record) => {
        this.record = record;
      });
    this.loggingService.printLog('RecordDetailComponent initialized');
  }

  onEditRecord() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteRecord() {
    this.store.dispatch(RecordsActions.deleteRecord({ id: this.id }));
    this.store.dispatch(RecordsActions.getAllRecords());

    this.router.navigate(['/records']);
  }
  ngOnDestroy() {
    this.store.dispatch(RecordsActions.getAllRecords());
  }
}

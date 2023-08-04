import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Reader } from '../reader.model';
import * as fromApp from '../../store/app.reducer';
import { LoggingService } from 'src/app/logging.service';
import * as ReadersActions from '../store/reader.actions';

@Component({
  selector: 'app-reader-list',
  templateUrl: './reader-list.component.html',
  styleUrls: ['./reader-list.component.css'],
})
export class ReaderListComponent implements OnInit, OnDestroy {
  readers: Reader[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.store.dispatch(ReadersActions.getAllReaders());

    this.subscription = this.store
      .select('readers')
      .pipe(map((readersState) => readersState.readers))
      .subscribe((readers: Reader[]) => {
        this.readers = readers;
      });

    this.loggingService.printLog('ReaderListComponent initialized');
  }
  goToNewReader() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

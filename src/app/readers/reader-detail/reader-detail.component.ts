import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Reader } from '../reader.model';
import * as fromApp from '../../store/app.reducer';
import * as ReadersActions from '../store/reader.actions';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-reader-detail',
  templateUrl: './reader-detail.component.html',
  styleUrls: ['./reader-detail.component.css'],
})
export class ReaderDetailComponent implements OnInit, OnDestroy {
  reader: Reader;
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
          return this.store.select('readers');
        }),
        map((readersState) => {
          return readersState.readers.find((reader, index) => {
            return reader.id === this.id;
          });
        })
      )
      .subscribe((reader) => {
        this.reader = reader;
      });

    this.loggingService.printLog('ReadersDetailComponent initialized');
  }

  onEditReader() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteReader() {
    this.store.dispatch(ReadersActions.deleteReader({ id: this.id }));
    this.store.dispatch(ReadersActions.getAllReaders());

    this.router.navigate(['/readers']);
  }
  ngOnDestroy() {
    this.store.dispatch(ReadersActions.getAllReaders());
  }
}

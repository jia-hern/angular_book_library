import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as ReadersActions from '../store/reader.actions';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-reader-edit',
  templateUrl: './reader-edit.component.html',
  styleUrls: ['./reader-edit.component.css'],
})
export class ReaderEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  readerForm: FormGroup;

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
      this.editMode = params['id'] != null;
      this.initializeForm();
    });
    this.loggingService.printLog('ReadersEditComponent initialized');
  }
  onSubmit() {
    let reader = this.readerForm.value;
    if (this.editMode) {
      reader.id = this.id;
    }
    this.store.dispatch(ReadersActions.saveReader({ reader }));
    this.onNavigateBack();
  }
  onNavigateBack() {
    this.store.dispatch(ReadersActions.getAllReaders());
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
    this.store.dispatch(ReadersActions.getAllReaders());
  }
  private initializeForm() {
    let readerName = '';
    let readerBirthDate;

    if (this.editMode) {
      this.storeSubscription = this.store
        .select('readers')
        .pipe(
          map((readerState) => {
            return readerState.readers.find((reader, index) => {
              return reader.id === this.id;
            });
          })
        )
        .subscribe((reader) => {
          readerName = reader.name;
          readerBirthDate = reader.birthDate;
        });
    }
    this.readerForm = new FormGroup({
      name: new FormControl(readerName, Validators.required),
      birthDate: new FormControl(readerBirthDate, Validators.required),
    });
  }
}

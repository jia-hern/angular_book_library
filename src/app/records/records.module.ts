import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './records/records.component';
import { RecordListComponent } from './record-list/record-list.component';
import { RecordItemComponent } from './record-list/record-item/record-item.component';
import { RecordStartComponent } from './record-start/record-start.component';
import { RecordDetailComponent } from './record-detail/record-detail.component';
import { RecordEditComponent } from './record-edit/record-edit.component';

@NgModule({
  declarations: [
    RecordsComponent,
    RecordListComponent,
    RecordItemComponent,
    RecordStartComponent,
    RecordDetailComponent,
    RecordEditComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    RecordsRoutingModule,
    SharedModule,
  ],
})
export class RecordsModule {}

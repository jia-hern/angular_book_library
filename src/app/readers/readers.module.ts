import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ReadersRoutingModule } from './readers-routing.module';
import { ReadersComponent } from './readers/readers.component';
import { ReaderListComponent } from './reader-list/reader-list.component';
import { ReaderItemComponent } from './reader-list/reader-item/reader-item.component';
import { ReaderStartComponent } from './reader-start/reader-start.component';
import { ReaderDetailComponent } from './reader-detail/reader-detail.component';
import { ReaderEditComponent } from './reader-edit/reader-edit.component';

@NgModule({
  declarations: [
    ReadersComponent,
    ReaderListComponent,
    ReaderItemComponent,
    ReaderStartComponent,
    ReaderDetailComponent,
    ReaderEditComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ReadersRoutingModule,
    SharedModule,
  ],
})
export class ReadersModule {}

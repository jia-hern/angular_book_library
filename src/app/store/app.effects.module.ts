import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { BookEffects } from '../books/store/book.effects';
import { ReaderEffects } from '../readers/store/reader.effects';
import { RecordEffects } from '../records/store/record.effects';
import { AuthEffects } from '../auth/store/auth.effects';
import { AdminEffects } from '../admin/store/admin.effects';

export const effects = [
  BookEffects,
  ReaderEffects,
  RecordEffects,
  AuthEffects,
  AdminEffects,
];

@NgModule({
  imports: [EffectsModule.forRoot(effects)],
  declarations: [],
})
export class AppEffectModule {}

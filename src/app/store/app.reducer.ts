import { ActionReducerMap } from '@ngrx/store';

import * as fromBooks from '../books/store/book.reducer';
import * as fromReaders from '../readers/store/reader.reducer';
import * as fromRecords from '../records/store/record.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromAdmin from '../admin/store/admin.reducer';

export interface AppState {
  books: fromBooks.State;
  readers: fromReaders.State;
  records: fromRecords.State;
  auth: fromAuth.State;
  admin: fromAdmin.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  books: fromBooks.bookReducer,
  readers: fromReaders.readerReducer,
  records: fromRecords.recordReducer,
  auth: fromAuth.authReducer,
  admin: fromAdmin.adminReducer,
};

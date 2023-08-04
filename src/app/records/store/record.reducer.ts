import { createReducer, on } from '@ngrx/store';

import { Record } from '../record.model';
import * as RecordActions from './record.actions';

export interface State {
  records: Record[];
}

const initialState: State = {
  records: [],
};

export const recordReducer = createReducer(
  initialState,
  on(RecordActions.setRecords, (state, action) => {
    return {
      ...state,
      records: [...action.records],
    };
  })
);

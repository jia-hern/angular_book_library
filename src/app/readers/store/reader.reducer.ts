import { createReducer, on } from '@ngrx/store';

import { Reader } from '../reader.model';
import * as ReaderActions from './reader.actions';

export interface State {
  readers: Reader[];
}

const inititalState: State = {
  readers: [],
};

export const readerReducer = createReducer(
  inititalState,
  on(ReaderActions.setReaders, (state, action) => {
    return {
      ...state,
      readers: [...action.readers],
    };
  })
);

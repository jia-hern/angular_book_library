import { createReducer, on } from '@ngrx/store';

import { Book } from '../book.model';
import * as BookActions from './book.actions';

export interface State {
  books: Book[];
}

const initialState: State = {
  books: [],
};

export const bookReducer = createReducer(
  initialState,
  on(BookActions.setBooks, (state, action) => {
    return {
      ...state,
      books: [...action.books],
    };
  })
);

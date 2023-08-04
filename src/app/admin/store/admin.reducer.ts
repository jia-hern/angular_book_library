import { createReducer, on } from '@ngrx/store';

import { User } from '../../shared/models/user.model';
import * as AdminActions from './admin.actions';

export interface State {
  users: User[];
}
const initialState: State = {
  users: [],
};

export const adminReducer = createReducer(
  initialState,
  on(AdminActions.setUsers, (state, action) => {
    return {
      ...state,
      users: [...action.users],
    };
  })
);

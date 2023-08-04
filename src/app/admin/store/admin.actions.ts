import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models/user.model';

// used in get all admin effect,
// to pass to the reducer
export const setUsers = createAction(
  '[Admin] Set Users',
  props<{ users: User[] }>()
);

// ------for api in effects ---------
// get request to get all users
export const getAllUsers = createAction('[Admin] Get All Users');
// post request to update user role with id and role
export const updateRole = createAction(
  '[Admin] Update Role',
  props<{ userId: number; role: string }>()
);
// delete user request
export const deleteUser = createAction(
  '[Admin] Delete User',
  props<{ id: number }>()
);
// get request to get user by id
export const getUser = createAction(
  '[Admin] Get User',
  props<{ id: number }>()
);

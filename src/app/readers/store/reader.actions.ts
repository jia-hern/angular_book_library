import { createAction, props } from '@ngrx/store';
import { Reader } from '../reader.model';

// used in get all readers effect,
// to pass to the reducer
export const setReaders = createAction(
  '[Reader] Set Readers',
  props<{ readers: Reader[] }>()
);

// ------for api in effects ---------

// get request to get all readers
export const getAllReaders = createAction('[Reader] Get All Readers');

export const getAllReadersByBookId = createAction(
  '[Reader] Get All Readers By Book Id',
  props<{ bookId: number }>()
);
// post request to add new reader/ update reader with id
export const saveReader = createAction(
  '[Reader] Save Reader',
  props<{ reader: Reader }>()
);
// delete reader request
export const deleteReader = createAction(
  '[Reader] Delete Reader',
  props<{ id: number }>()
);
// get request to get reader by id
export const getReader = createAction(
  '[Reader] Get Reader',
  props<{ id: number }>()
);

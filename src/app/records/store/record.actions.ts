import { createAction, props } from '@ngrx/store';
import { Record } from '../record.model';
import { RecordSubmit } from '../recordSubmit.model';

// used in get all records effect,
// to pass to the reducer
export const setRecords = createAction(
  '[Record] Set Records',
  props<{ records: Record[] }>()
);

// ------for api in effects ---------

// get request to get all records
export const getAllRecords = createAction('[Record] Get All Records');

export const getAllRecordsByReaderId = createAction(
  '[Record] Get All Records By Reader Id',
  props<{ readerId: number }>()
);
export const getAllRecordsByBookId = createAction(
  '[Record] Get All Records By Book Id',
  props<{ bookId: number }>()
);
// post request to add new record/ update record with id,
// and with reader id and book id
export const saveRecord = createAction(
  '[Record] Save Record',
  props<{ record: RecordSubmit }>()
);

// delete record request
export const deleteRecord = createAction(
  '[Record] Delete Record',
  props<{ id: number }>()
);
export const deleteRecordByReaderAndBookId = createAction(
  '[Record] Delete Record by readerId and bookId',
  props<{ readerId: number; bookId: number }>()
);
// get request to get record by id
export const getRecord = createAction(
  '[Record] Get Record',
  props<{ id: number }>()
);
// get request to get record by reader id and book id
export const getRecordByReaderAndBookId = createAction(
  '[Book] Get Book by readerId and bookId',
  props<{ readerId: number; bookId: number }>()
);
// action to assign reader to book under book actions

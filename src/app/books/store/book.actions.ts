import { createAction, props } from '@ngrx/store';
import { Book } from '../book.model';

// used in get all books effect,
// to pass to the reducer
export const setBooks = createAction(
  '[Book] Set Books',
  props<{ books: Book[] }>()
);

// ------for api in effects ---------

// get request to get all books
export const getAllBooks = createAction('[Book] Get All Books');

export const getAllBooksByReaderId = createAction(
  '[Book] Get All Books By Reader Id',
  props<{ readerId: number }>()
);
// post request to add new book/ update book with id
export const saveBook = createAction(
  '[Book] Save Book',
  props<{ book: Book }>()
);

// delete book request
export const deleteBook = createAction(
  '[Book] Delete Book',
  props<{ id: number }>()
);

// get request to get book by id
export const getBook = createAction('[Book] Get Book', props<{ id: number }>());
// get request to get book by record id
export const getBookByRecordId = createAction(
  '[Book] Get Book by Record id',
  props<{ recordId: number }>()
);

// post request to link book with reader
export const assignReaderToBook = createAction(
  '[Book] Assign Reader to Book',
  props<{ bookId: number; readerId: number }>()
);

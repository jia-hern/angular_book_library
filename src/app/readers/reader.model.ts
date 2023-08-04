import { Book } from '../books/book.model';
import { Record } from '../records/record.model';

export class Reader {
  constructor(
    public name: string,
    public birthDate: Date,
    public records: Record[],
    public books: Book[],
    public id?: number
  ) {}
}

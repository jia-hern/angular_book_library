import { Book } from '../books/book.model';
import { Reader } from '../readers/reader.model';

export class Record {
  constructor(
    public activity: string,
    public timestamp: Date,
    public reader: Reader,
    public book: Book,
    public id?: number
  ) {}
}

import { Reader } from '../readers/reader.model';
import { Record } from '../records/record.model';

export class Book {
  constructor(
    public title: string,
    public description: string,
    public records: Record[],
    public readers: Reader[],
    public id?: number
  ) {}
}

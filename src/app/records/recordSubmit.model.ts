export class RecordSubmit {
  constructor(
    public activity: string,
    public bookId: number,
    public readerId: number,
    public id?: number
  ) {}
}

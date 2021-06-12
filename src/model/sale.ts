export class Sale {
  public libraryId: string;
  public amount: number;
  public notes: string;

  constructor(amount: number, notes: string, libraryId: string) {
    this.amount = amount;
    this.notes = notes;
    this.libraryId = libraryId;
  }
}

export default Sale;

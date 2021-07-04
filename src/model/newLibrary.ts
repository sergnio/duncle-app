import NoteDAO from "./noteDAO";

export type LastContactType = "email" | "inPerson" | "phone";

export default interface NewLibrary {
  _id: string;
  libraryName: string;
  librarian: string;
  street: string;
  district: string;
  city: string;
  county: string;
  state: string;
  zip: string;
  email: string;
  phoneNumber: number;
  dateUpdated: string;
  assignedRep: string;
  totalSales: number;
  lastSale: number;
  territoryId: string;
  personalNotes?: NoteDAO;
  level?: string;
  size?: number;
  assistant?: string;
  extension?: string;
  dateLastSale?: string;
  dateLastContact?: string;
  lastContactType?: LastContactType;
  dateNextContact?: string;
  notes: NoteDAO[];
}

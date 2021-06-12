// @ts-ignore

interface Table {
  _id: string;
  _rev?: string;
  libraryName: string;
  librarian: string;
  assistant: string;
  street: string;
  district: string;
  city: string;
  county: string;
  state: string; // default to WI
  zip: number;
  email: string;
  phoneNumber: string; // but display as (XXX)-XXX-XXXX
  extension: string;
  level: string;
  size: number;
  dateNextContact?: string; // todo - ??? or date
  // notes?: Notes 1..*
  // user._id: string;
  message: string;
  dateCreated: string; // todo - ??? or date
  totalSales?: number;
  lastSale?: number;
  dateLastSale?: string; // todo - ??? or date
  dateUpdated: string; // todo - ??? or date
  // assignedRep: user.first_name;
}

interface User {
  // TABLE
  _id: string;
  _rev?: string;
  firstName: string;
  lastName: string;
  email: string;
  dateCreated: string;
  dateUpdated: string;
  role: Object;
}

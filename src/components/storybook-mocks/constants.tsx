import { Library } from "../../model";
import { dateNowIso, readableDate } from "../../utils/dateUtil";
import NoteDAO from "../../model/noteDAO";
import UserDAO from "../../model/userDAO";
import event from "../../model/event";
import { PouchResponse } from "../../queries/queriesUtils";

export const newNotes: NoteDAO[] = [
  {
    id: "1",
    message: "Personal foul on #69 - he was giving him the business",
    dateCreated: readableDate(dateNowIso()),
    author: "Mr. Sir",
  },
  {
    id: "2",
    message: "Attempted to call person, but there was no answer",
    dateCreated: readableDate(dateNowIso()),
    author: "Terry",
  },
  {
    id: "3",
    message: "Bought $5,050 and wants more where that came from.",
    dateCreated: readableDate(dateNowIso()),
    author: "Mr Sir",
  },
  {
    id: "4",
    message: "Significant understanding likes to have a shower in the morning.",
    dateCreated: readableDate(dateNowIso()),
    author: "Jeff",
  },
  {
    id: "5",
    message: "The legend of the raven's roar visits Japan in the winter.",
    dateCreated: readableDate(dateNowIso()),
    author: "Jeff",
  },
  {
    id: "6",
    message:
      "Nothing of importance gambles with lives, happiness, and even destiny itself!",
    dateCreated: readableDate(dateNowIso()),
    author: "Terry",
  },
  {
    id: "7",
    message:
      "Lonely Henry is interdependant on the relatedness of motivation, subcultures, and management.",
    dateCreated: readableDate(dateNowIso()),
    author: "Mr Sir",
  },
];

export const newLibrary: Library = {
  _id: "fakeid",
  _rev: "fakerev",
  libraryName: "West Side Elementary",
  librarian: "Dontell Smith",
  assistant: "Mr. Sir",
  street: "Randolph Street",
  district: "District",
  city: "Mute City",
  county: "Orange County",
  state: "Wisconsin",
  zip: "54545",
  email: "se@gg.com",
  phoneNumber: 1112223333,
  level: "K - 4",
  size: 100,
  dateUpdated: "2020-07-14T22:04:54+0000",
  assignedRep: "Mr. Sir",
  totalSales: 50205,
  lastSale: 2050,
  notes: newNotes,
  dateNextContact: dateNowIso(),
};

export const newLibrary2: Library = {
  _id: "fakeid",
  _rev: "fakerev",
  libraryName: "Northwest Elementary",
  librarian: "K only",
  assistant: "Mrs. Thicc",
  street: "Mr. Sir City",
  district: "OP District",
  city: "Target Corp. City",
  county: "TGT Lane",
  state: "Wisconsin",
  zip: "54545",
  email: "this.is.a.long.email@gmail.com",
  phoneNumber: 1112223333,
  level: "K - 4",
  size: 9000,
  dateUpdated: "2020-07-22T22:04:54+0000",
  assignedRep: "Terry",
  totalSales: 100205,
  lastSale: 10000,
  notes: [],
};

export const NoLibrary: Library = {
  _id: "noid",
  _rev: "norev",
  libraryName: "Default Library",
  librarian: "Default",
  assistant: "Default",
  street: "Default",
  district: "Default",
  city: "Default",
  county: "Default",
  state: "Default",
  zip: "Default",
  email: "Default",
  phoneNumber: 1112223333,
  level: "Default",
  size: 0,
  dateUpdated: "2000-00-00T00:00:00+0000",
  assignedRep: "Default",
  totalSales: 0,
  lastSale: 0,
  notes: [],
};

export const dummyEvent: event = {
  id: "dummy",
  title: "dummy",
  start: "dummy",
  end: "dummy",
  dateCreated: "dummy",
  dateUpdated: "dummy",
  libraryId: "dummy",
  hasContacted: false,
};

export const dummyUserDAO: UserDAO = {
  _id: "dummy",
  _rev: "dummy",
  email: "dummy",
  username: "dummy",
  password: "dummy",
  firstName: "dummy",
  lastName: "dummy",
  dateCreated: "dummy",
  dateUpdated: "dummy",
  role: "admin",
  events: [dummyEvent],
};

export const newNote: NoteDAO = {
  id: "88",
  message: "Bought $5,050 and wants more where that came from.",
  dateCreated: readableDate(dateNowIso()),
  author: "Mr Sir",
};

function setUserToken(user: UserDAO) {
  const now = new Date();
  const oneMinute = 60000;
  const oneHour = oneMinute * 60;
  const twoHours = oneHour * 2;

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    // set user info, along with token
    value: user,
    expiry: now.getTime() + twoHours,
  };
  return JSON.stringify(item);
}

export const mockToken = setUserToken(dummyUserDAO);

export const listOfLibrariesResponse: PouchResponse = {
  rows: [
    {
      doc: newLibrary,
      id: "id1",
      key: "id1",
      value: {
        rev: "rev1",
      },
    },
    {
      doc: newLibrary2,
      id: "id2",
      key: "id2",
      value: {
        rev: "rev2",
      },
    },
  ],
};

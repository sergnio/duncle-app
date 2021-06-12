import event from "./event";

export type Roles = "admin" | "user";

export default interface User {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dateCreated: string;
  dateUpdated: string;
  role: Roles;
  events: event[];
}

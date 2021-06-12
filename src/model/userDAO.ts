import User from "./user";

export default interface UserDAO extends User {
  _id: string;
  _rev: string;
}

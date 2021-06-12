import User from "./user";

export default interface newUser extends User {
  confirmPassword: string;
}

import { useUserPouch } from "../hooks/UsePouch";
import bcrypt from "bcryptjs";
import UserDAO from "../model/userDAO";
import User from "../model/user";
import { dateNowIso } from "../utils/dateUtil";

export default () => {
  const { fetchUser, addUser } = useUserPouch();
  const logInUser = async (user: User): Promise<UserDAO> => {
    const daoUser: UserDAO = await fetchUser(user.email);

    if (compare(user.password, daoUser.password)) {
      return daoUser;
    } else {
      throw new Error(
        "Wrong password. Try again or click Forgot password to reset it"
      );
    }
  };

  const signUpUser = async (newUser: User) => {
    const hashedPassword = await hash(newUser.password);
    newUser.password = hashedPassword;
    newUser.dateCreated = dateNowIso();
    newUser.dateUpdated = dateNowIso();
    newUser.role = "user";
    newUser.events = [];
    return addUser(newUser);
  };

  // todo - could move these to another class.
  const hash = (password: string): string => {
    return bcrypt.hashSync(password);
  };

  const compare = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash);
  };

  return { logInUser, compare, hash, signUpUser };
};

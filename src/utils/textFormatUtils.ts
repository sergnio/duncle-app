import { LastContactType } from "../model/newLibrary";

export const formatContactType = (
  type: LastContactType | undefined
): string => {
  switch (type) {
    // this can easily be an UnCamelize function
    case "email":
      return "Email";
    case "inPerson":
      return "In Person";
    case "phone":
      return "Phone";
    default:
      return "";
  }
};

export const getUsernameFromEmail = (email: string): string => {
  const regex = /.+?(?=@)/;
  const result: RegExpMatchArray | null = email.match(regex);
  if (result === null) {
    throw new Error(` Invalid username: Failed to parse out a username from: ${email}.
            Use a valid email format. i.e. jsmith@example.com`);
  } else {
    return result[0];
  }
};

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

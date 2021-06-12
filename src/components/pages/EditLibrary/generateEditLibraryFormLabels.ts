import Library from "../../../model/library";

export interface LabelProps {
  label: string;
  currentValue: string | number | undefined;
  isRequired: boolean;
}

export default (currentLibrary: Library): LabelProps[] => {
  const isRequired: boolean = true;
  const {
    street,
    city,
    county,
    level,
    libraryName,
    librarian,
    district,
    state,
    zip,
    size,
    email,
    phoneNumber,
    assistant,
    assignedRep,
    extension,
  } = currentLibrary;

  return [
    { label: "Library Name", currentValue: libraryName, isRequired },
    { label: "Librarian", currentValue: librarian, isRequired },
    { label: "Assistant", currentValue: assistant, isRequired: false },
    { label: "Street", currentValue: street, isRequired },
    { label: "District", currentValue: district, isRequired },
    { label: "City", currentValue: city, isRequired },
    { label: "County", currentValue: county, isRequired },
    { label: "State", currentValue: state, isRequired },
    { label: "Zip", currentValue: zip, isRequired },
    { label: "Email", currentValue: email, isRequired },
    { label: "Phone Number", currentValue: phoneNumber, isRequired },
    { label: "extension", currentValue: extension, isRequired: false },
    { label: "Assigned Rep", currentValue: assignedRep, isRequired },
    { label: "Level", currentValue: level, isRequired: false },
    { label: "Size", currentValue: size, isRequired: false },
  ];
};

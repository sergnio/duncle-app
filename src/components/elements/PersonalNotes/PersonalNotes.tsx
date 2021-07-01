import React from "react";
import EditableNote from "../Note/EditableNote";
import NoteDAO from "../../../model/noteDAO";
import { createNewNote } from "../../../utils/noteUtils";
import useSaveLibraryQuery from "../../../queries/useSaveLibraryQuery";
import Library from "../../../model/library";
import Title from "../../styles/Title";

interface Props {
  library: Library;
}

export default ({ library }: Props) => {
  const { mutate: saveLibrary } = useSaveLibraryQuery();

  const { message, dateCreated, id, author }: NoteDAO = library.personalNotes
    ? library.personalNotes
    : createNewNote("No notes recorded", library.assignedRep);

  // this comes from the note form
  const onSubmit = (note: any) => {
    const editedLibrary: Library = { ...library, personalNotes: note };
    saveLibrary(editedLibrary);
  };

  return (
    <div>
      <Title>Personal Details</Title>
      <EditableNote
        message={message}
        author={author}
        dateCreated={dateCreated}
        id={id}
        SubmitForm={onSubmit}
      />
    </div>
  );
};

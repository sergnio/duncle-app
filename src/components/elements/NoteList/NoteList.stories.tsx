import React from "react";
import NoteList from "./NoteList";
import { newNotes } from "../../storybook-mocks/constants";
import NoteDAO from "../../../model/noteDAO";

export default {
  title: "Elements/NoteList",
  component: NoteList,
};

const notes: NoteDAO[] = newNotes;
export const Default = () => (
  <NoteList
    notes={notes}
    SubmitForm={(note) => alert(`Submitted ${note.message}`)}
  />
);

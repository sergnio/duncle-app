import { v4 as uuidv4 } from "uuid";
import { dateNowIso } from "./dateUtil";
import NoteDAO from "../model/noteDAO";

export const createNewNote = (message: string, author: string): NoteDAO => ({
  id: uuidv4(),
  message,
  dateCreated: dateNowIso(),
  author,
});

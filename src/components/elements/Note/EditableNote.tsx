import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Edit from "@material-ui/icons/Edit";
import TextArea from "../../atoms/TextArea/TextArea";
import { Form } from "react-final-form";
import Clear from "@material-ui/icons/Clear";
import NoteDAO from "../../../model/noteDAO";
import { isIsoDate, readableDate } from "../../../utils/dateUtil";

export interface NoteProps extends NoteDAO {
  SubmitForm(values: NoteDAO): any;
}

export interface EditableNoteSubmitValues {
  note: string;
}

export default function ({
  id,
  message,
  author,
  dateCreated,
  SubmitForm,
}: NoteProps) {
  const [isEditing, setisEditing] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string>(message);

  const cancel = () => setisEditing(false);

  const content = isEditing ? (
    // todo - make this prettier
    <CardContent>
      <Form
        onSubmit={({ note }: EditableNoteSubmitValues) => {
          // @ts-ignore - this can't be undefined
          const newNote: NoteDAO = { id, message: note, author, dateCreated };
          SubmitForm(newNote);
          setCurrentMessage(note);
          cancel();
        }}
        // @ts-ignore
        initialValues={message}
        render={({ handleSubmit }) => (
          <>
            <TextArea
              name="note"
              placeholderText="A note is required"
              message={currentMessage}
            />
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            <Button type="submit" onClick={cancel}>
              <Clear />
            </Button>
          </>
        )}
      />
    </CardContent>
  ) : (
    <>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Created by {author}
        </Typography>
        <Typography variant="h5" component="h2">
          {currentMessage}
        </Typography>
        <Typography color="textSecondary">
          {/* Only show the formatted date, but store the iso date */}
          {isIsoDate(dateCreated) ? readableDate(dateCreated) : dateCreated}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setisEditing(true)}>
          <Edit /> Edit
        </Button>
      </CardActions>
    </>
  );

  return <Card>{content}</Card>;
}

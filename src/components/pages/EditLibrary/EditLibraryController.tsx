import React from "react";
import useSaveLibrary from "../../../common/queries/useSaveLibraryQuery";
import Library from "../../../model/library";
import { useHistory, useParams } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Form from "../../../common/Form";
import { Grid } from "@material-ui/core";
import CustomTextField from "../../atoms/TextField/CustomTextField";
import FormSubmitButton from "../../atoms/Button/FormSubmitButton";
import useStyles from "../../../global-styles";
import generateEditLibraryFormLabels, {
  LabelProps,
} from "./generateEditLibraryFormLabels";
import useLibraryQuery from "../../../common/queries/useLibraryQuery";
import { useLibraryState } from "../../../common/providers/LibraryProvider";

export default function EditLibraryController() {
  const { setCurrentLibrary } = useLibraryState();
  const { libraryId } = useParams<{ libraryId: string }>();
  const { data: library, isLoading, isSuccess, isError } = useLibraryQuery(
    libraryId
  );
  const { mutate: saveLibrary, isSuccess: saveSuccess } = useSaveLibrary();
  const history = useHistory();
  const { content, editLibrary } = useStyles();

  if (saveSuccess) {
    history.goBack();
  }

  if (isLoading) return <h1>Loading...</h1>;

  let formLabels: LabelProps[] = [];

  if (library) {
    setCurrentLibrary(library);
    formLabels = generateEditLibraryFormLabels(library);
  }

  return (
    <>
      {isError && <p>Error, try again</p>}
      {isSuccess && (
        <Paper className={content}>
          <Form
            onSubmit={(editedLibrary: Library) => saveLibrary(editedLibrary)}
          >
            <Grid container>
              {formLabels.map(({ label, currentValue, isRequired }, index) => (
                <Grid xs={6} className={editLibrary} key={`${label}-${index}`}>
                  <CustomTextField
                    key={`${label}-${index}`}
                    name={label}
                    defaultValue={currentValue}
                    alsoInitialValue
                    fullWidth={true}
                    isRequired={isRequired}
                  />
                </Grid>
              ))}
            </Grid>
            <FormSubmitButton DisplayText="Save Library" />
          </Form>
        </Paper>
      )}
    </>
  );
}

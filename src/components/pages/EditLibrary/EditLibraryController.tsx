import React from "react";
import useSaveLibrary from "../../../queries/useSaveLibraryQuery";
import Library from "../../../model/library";
import { useHistory, useParams } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Form from "../../elements/Form";
import { Grid } from "@material-ui/core";
import CustomTextField from "../../atoms/TextField/CustomTextField";
import FormSubmitButton from "../../atoms/Button/FormSubmitButton";
import useStyles from "../../../global-styles";
import generateEditLibraryFormLabels, {
  LabelProps,
} from "./generateEditLibraryFormLabels";
import useLibraryQuery from "../../../queries/useLibraryQuery";
import { useLibraryState } from "../../../providers/LibraryProvider";
import Button from "@material-ui/core/Button";
import FlexCenter from "../../../styles/FlexCenter";
import styled from "styled-components";
import ConfirmCloseDialog from "../../atoms/Dialogs/ConfirmCloseDialog";
import useConfirmDialog from "../../atoms/Dialogs/useConfirmDialog";
import useAuth from "../../../hooks/Auth/useAuth";
import TerritoryDropdown from "../../atoms/Dropdown/TerritoryDropdown";

const StyledButton = styled(Button)`
  color: red;
  margin: 24px 8px 16px;
`;

export default function EditLibraryController() {
  const { setCurrentLibrary } = useLibraryState();
  const { libraryId } = useParams<{ libraryId: string }>();
  const {
    data: library,
    isLoading,
    isSuccess,
    isError,
  } = useLibraryQuery(libraryId);
  const { mutate: saveLibrary, isSuccess: saveSuccess } = useSaveLibrary();
  const history = useHistory();
  const { content, editLibrary } = useStyles();
  const { open, handleOpen, handleClose } = useConfirmDialog();
  const { isAdmin } = useAuth();

  if (saveSuccess) {
    history.goBack();
  }

  if (isLoading) return <h1>Loading...</h1>;

  let formLabels: LabelProps[] = [];

  if (library) {
    setCurrentLibrary(library);
    formLabels = generateEditLibraryFormLabels(library);
  }

  const handleDelete = () => console.log("deleted");

  return (
    <>
      {isError && <p>Error, try again</p>}
      {isSuccess && (
        <Paper className={content}>
          <ConfirmCloseDialog
            onConfirm={handleDelete}
            open={open}
            onCancel={handleClose}
            message={`Are you sure you want to delete Library ${library.libraryName}? This has irreversible consequences`}
          />
          <Form
            onSubmit={(editedLibrary: Library) => saveLibrary(editedLibrary)}
          >
            <Grid container justify="center">
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
              <Grid xs={6} className={editLibrary}>
                <TerritoryDropdown />
              </Grid>
            </Grid>
            <FlexCenter>
              <FormSubmitButton DisplayText="Save Library" />
              {isAdmin && (
                <StyledButton onClick={handleOpen}>Delete Library</StyledButton>
              )}
            </FlexCenter>
          </Form>
        </Paper>
      )}
    </>
  );
}

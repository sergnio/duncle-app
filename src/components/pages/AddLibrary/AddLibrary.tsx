import React from "react";
import { Form } from "react-final-form";
import AddLibraryForm from "../../elements/AddLibrary/AddLibraryForm";
import NewLibrary from "../../../model/newLibrary";
import { useLibraryPouch } from "../../../common/hooks/UsePouch";
import { dateNowIso } from "../../../utils/dateUtil";
import { v4 as uuidv4 } from "uuid";
import { useNotification } from "../../atoms/Snackbar/Snackbar";
import { useHistory } from "react-router-dom";

export default function AddLibrary() {
  const { addNewLibrary } = useLibraryPouch();
  const { setSuccess, setError } = useNotification();
  const history = useHistory();

  async function submitForm(library: NewLibrary) {
    const updatedLibrary: NewLibrary = addDefaults(library);
    try {
      await addNewLibrary(updatedLibrary);
      setSuccess("Successfully saved library");
      history.push("/dashboard");
    } catch (e) {
      setError(e);
    }
  }

  return <Form onSubmit={submitForm} component={AddLibraryForm} />;
}

function addDefaults(library: NewLibrary) {
  library._id = uuidv4();
  library.notes = [];
  library.assignedRep = "TODO";
  library.dateUpdated = dateNowIso();
  library.totalSales = 0;
  library.lastSale = 0;
  return library;
}

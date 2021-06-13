import React from "react";
import { Form } from "react-final-form";
import AddLibraryForm from "../../elements/AddLibrary/AddLibraryForm";
import NewLibrary from "../../../model/newLibrary";
import { useLibraryPouch } from "../../../common/hooks/UsePouch";
import { dateNowIso } from "../../../utils/dateUtil";
import { v4 as uuidv4 } from "uuid";
import { useNotification } from "../../atoms/Snackbar/Snackbar";
import { useHistory } from "react-router-dom";
import useAuth from "../../../common/hooks/Auth/useAuth";

function addDefaults(library: NewLibrary, rep: string) {
  library._id = uuidv4();
  library.notes = [];
  library.assignedRep = rep;
  library.dateUpdated = dateNowIso();
  library.totalSales = 0;
  library.lastSale = 0;
  return library;
}

export default function AddLibrary() {
  const { addNewLibrary } = useLibraryPouch();
  const { setSuccess, setError } = useNotification();
  const { getAuthenticatedUser } = useAuth();
  const history = useHistory();

  const user = getAuthenticatedUser();

  async function submitForm(library: NewLibrary) {
    const updatedLibrary: NewLibrary = addDefaults(library, user.username);
    try {
      await addNewLibrary(updatedLibrary);
      setSuccess("Successfully saved library");
      history.push("/dashboard");
    } catch (e) {
      setError(e);
    }
  }

  return <Form onSubmit={submitForm} component={AddLibraryForm} user={user} />;
}

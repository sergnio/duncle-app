import Library from "../../../model/library";
import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid/Grid";
import Table from "../../elements/Table/Table";
import { useHistory } from "react-router-dom";
import useLibraries from "../../../queries/useLibraries";
import { useSeeOthersState } from "../../../providers/SeeOthersProvider";
import { useNotification } from "../../atoms/Snackbar/Snackbar";

export default () => {
  const { checked } = useSeeOthersState();
  const {
    data: libraries,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useLibraries();

  const { setSuccess, setError } = useNotification();

  console.log({ libraries });

  const history = useHistory();

  const otherLibs: Library[] = [];

  /** default, Terry libraries */
  if (isSuccess && libraries && checked.checkedUser) {
    otherLibs.push(...libraries);
  }

  if (isLoading) return <h1>Loading...</h1>;

  function routeToLibraryDetail(library: Library): void {
    // todo - add a ? with the rep name to denote which DB to look in?
    history.push(`/library/${library._id}`);
  }

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {isSuccess && (
        <Grid container justify="center">
          <Grid item xs={11}>
            <Card variant="outlined">
              <Table
                libraries={otherLibs}
                onEdit={routeToLibraryDetail}
                refetch={refetch}
                setSuccess={setSuccess}
                setError={setError}
              />
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

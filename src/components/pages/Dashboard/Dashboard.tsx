import Library from "../../../model/library";
import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid/Grid";
import Table from "../../elements/Table/Table";
import { useHistory } from "react-router-dom";
import useLibraries from "../../../queries/useLibraries";
import { useSeeOthersState } from "../../../providers/SeeOthersProvider";
import { useNotification } from "../../atoms/Snackbar/Snackbar";
import { useQueryClient } from "react-query";

interface Props {
  manageTerritories: boolean;
}

export default ({ manageTerritories = false }: Props) => {
  const { selectedUsers } = useSeeOthersState();
  const {
    data: libraries,
    isLoading,
    isSuccess,
    error,
  } = useLibraries(selectedUsers);
  const history = useHistory();

  if (isLoading) return <h1>Loading...</h1>;

  console.log({ libraries });

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
                libraries={libraries}
                onEdit={routeToLibraryDetail}
                manageTerritories={manageTerritories}
              />
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

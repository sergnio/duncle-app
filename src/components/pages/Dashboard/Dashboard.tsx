import Library from "../../../model/library";
import React from "react";
import { Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import Table from "../../elements/Table/Table";
import { useHistory } from "react-router-dom";
import useLibraries from "../../../common/queries/useLibraries";
import useAdminLibraries from "../../../common/queries/useAdminLibraries";
import { useSeeOthersState } from "../../../common/providers/SeeOthersProvider";

export default () => {
  const { checked } = useSeeOthersState();
  const { data: libraries, isLoading, isSuccess, error } = useLibraries();
  const samData = useAdminLibraries("sam");
  const jimData = useAdminLibraries("jim");

  const history = useHistory();

  let otherLibs: Library[] = [];

  /** default, Terry libraries */
  if (isSuccess && libraries && checked.checkedTerry) {
    otherLibs.push(...libraries);
  }

  if (samData?.isSuccess && samData?.data && checked.checkedSam) {
    otherLibs.push(...samData.data);
  }

  if (jimData?.isSuccess && jimData?.data && checked.checkedJim) {
    otherLibs.push(...jimData.data);
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
              <Table libraries={otherLibs} onEdit={routeToLibraryDetail} />
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

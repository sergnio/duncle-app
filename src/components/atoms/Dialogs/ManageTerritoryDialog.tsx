import React from "react";
import GenericDialog from "./GenericDialog";
import DashboardView from "../../pages/Dashboard/Dashboard";
import SeeOthersProvider from "../../../providers/SeeOthersProvider";

interface Props {
  handleClose(): void;
  open: boolean;
}

export default ({ handleClose, open }: Props) => {
  return (
    <GenericDialog
      title="Manage Territories"
      handleClose={handleClose}
      open={open}
      fullScreen
    >
      <SeeOthersProvider>
        {/* todo - srn pass in the territory that we're on, and auto search on that field */}
        <DashboardView manageTerritories={true} />
      </SeeOthersProvider>
    </GenericDialog>
  );
};

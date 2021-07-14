import React from "react";
import MaterialTable from "material-table";
import { Library } from "../../../model";
import { tableIcons } from "../tableIcons";
import moment from "moment";
import { getColor } from "../../../utils/colorUtils";
import TableHeader from "./TableHeader";
import useTableColumns from "./useTableColumns";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import Tooltip from "@material-ui/core/Tooltip";

type TableProps = {
  libraries: Library[];
  refetch(): void;
  setSuccess(message: string): void;
  setError(message: string): void;
  onEdit?(library: Library): void;
  manageTerritories: boolean;
};
export default ({
  libraries,
  onEdit,
  refetch,
  setSuccess,
  setError,
  manageTerritories,
}: TableProps) => {
  const tableColumns = useTableColumns();

  const onRefresh = async () => {
    try {
      await refetch();
      setSuccess("Successfully refreshed libraries");
    } catch (e) {
      setError(`Failed to refresh libraries: ${e}`);
    }
  };

  const RefreshIconButton = (
    <IconButton onClick={onRefresh}>
      <Tooltip title="Manually refresh list of libraries" placement="bottom">
        <RefreshIcon />
      </Tooltip>
    </IconButton>
  );

  return (
    <>
      <TableHeader />
      <MaterialTable
        title={RefreshIconButton}
        columns={tableColumns}
        data={libraries}
        // @ts-ignore
        icons={tableIcons}
        options={{
          // todo - might have to revisit this.. probably better to do 100 page size, with pagination options
          //  see docs - https://material-table.com/#/docs/all-props
          paging: false,
          rowStyle: ({ dateNextContact }: Library) => {
            let nextDate;
            if (dateNextContact) {
              nextDate = moment(dateNextContact).toDate();
            }

            const backgroundColor: string = getColor(nextDate);
            return { backgroundColor };
          },
        }}
        actions={[
          // todo - if it's manageTerritories, then show the territory dropdown
          {
            // @ts-ignore
            icon: tableIcons.Create,
            tooltip: "Edit UserDAO",
            // @ts-ignore
            onClick: (event, rowData) => onEdit(rowData),
          },
        ]}
      />
    </>
  );
};

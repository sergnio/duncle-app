import React from "react";
import MaterialTable from "material-table";
import { Library } from "../../../model";
import { tableIcons } from "../../../common/tableIcons";
import moment from "moment";
import { getColor } from "../../../utils/colorUtils";
import TableHeader from "./TableHeader";
import useTableColumns from "./useTableColumns";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh";

type TableProps = {
  libraries: Library[];
  onEdit?(library: Library): void;
  refetch(): void;
  setSuccess(message: string): void;
  setError(message: string): void;
};
export default ({
  libraries,
  onEdit,
  refetch,
  setSuccess,
  setError,
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

  const RefreshButton = (
    <Button onClick={onRefresh}>
      <RefreshIcon />
    </Button>
  );

  return (
    <>
      <TableHeader />
      <MaterialTable
        title={RefreshButton}
        columns={tableColumns}
        data={libraries}
        // @ts-ignore
        icons={tableIcons}
        options={{
          // todo - might have to revisit this.. probably better to do 100 page size, with pagination options
          //  see docs - https://material-table.com/#/docs/all-props
          paging: false,
          rowStyle: ({ dateNextContact, libraryName }: Library) => {
            let nextDate;
            if (dateNextContact) {
              nextDate = moment(dateNextContact).toDate();
            }

            const backgroundColor: string = getColor(nextDate);
            return { backgroundColor };
          },
        }}
        actions={[
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

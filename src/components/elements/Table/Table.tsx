import React from "react";
import MaterialTable from "material-table";
import { Library } from "../../../model";
import { tableIcons } from "../../../common/tableIcons";
import moment from "moment";
import { getColor } from "../../../utils/colorUtils";
import TableHeader from "./TableHeader";
import useTableColumns from "./useTableColumns";

type TableProps = {
  libraries: Library[];
  onEdit?(library: Library): void;
};
export default ({ libraries, onEdit }: TableProps) => {
  const tableColumns = useTableColumns();

  return (
    <>
      <TableHeader />
      <MaterialTable
        title=" "
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

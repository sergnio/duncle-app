import React, { BaseSyntheticEvent, useEffect, useRef } from "react";
import MaterialTable from "material-table";
import { Library } from "../../../model";
import { tableIcons } from "../tableIcons";
import moment from "moment";
import { getColor } from "../../../utils/colorUtils";
import TableHeader from "./TableHeader";
import useTableColumns from "./useTableColumns";
import TerritoryDropdown from "../../atoms/Dropdown/TerritoryDropdown";
import useTerritoriesQuery from "../../../queries/useTerritoriesQuery";
import useSaveLibraryQuery from "../../../queries/useSaveLibraryQuery";
import without from "lodash/without";
import Button from "@material-ui/core/Button";

type TableProps = {
  libraries: Library[];
  onEdit?(library: Library): void;
  manageTerritories: boolean;
};
export default ({ libraries, onEdit, manageTerritories }: TableProps) => {
  const tableColumns = useTableColumns();
  const { data } = useTerritoriesQuery();
  const selectedId = useRef<string>();
  const selectedLibs = useRef<Library[]>([]);
  const { mutate: saveLibrary, isSuccess, reset } = useSaveLibraryQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log("calling reset");
      reset();
    }
  }, [isSuccess, reset]);

  const onTerritoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectedId.current = event.target.value;
  };

  const onSave = () => {
    selectedLibs.current?.map((lib) => {
      const updatedLib = { ...lib, territoryId: selectedId.current };
      console.log({ updatedLib });
      // saveLibrary(updatedLib);
    });
  };

  const availableActions = manageTerritories
    ? [
        {
          position: "auto",
          icon: () => (
            // show dropdown here
            <>
              <TerritoryDropdown
                onChange={onTerritoryChange}
                options={data ?? []}
                currentValue={selectedId.current}
                // @ts-ignore
                style={{ minWidth: "150px" }}
              />
              <Button onClick={onSave}>Save</Button>
            </>
          ),
        },
      ]
    : [
        {
          // @ts-ignore
          icon: tableIcons.Create,
          tooltip: "Edit this library",
          // @ts-ignore
          onClick: (event, rowData) => onEdit(rowData),
        },
      ];
  return (
    <>
      <TableHeader />
      <MaterialTable
        title=""
        columns={tableColumns}
        // maybe map through each of these, if success then set ONLY .checked to true??
        data={libraries?.map((lib) => ({
          ...lib,
          tableData: { checked: false },
        }))}
        // @ts-ignore
        icons={tableIcons}
        options={{
          // todo - might have to revisit this.. probably better to do 100 page size, with pagination options
          //  see docs - https://material-table.com/#/docs/all-props
          paging: true,
          pageSize: 50,
          pageSizeOptions: [15, 25, 50, 100],
          rowStyle: ({ dateNextContact }: Library) => {
            let nextDate;
            if (dateNextContact) {
              nextDate = moment(dateNextContact).toDate();
            }

            const backgroundColor: string = getColor(nextDate);
            return { backgroundColor };
          },
          selection: manageTerritories,
        }}
        // TODO - this is money const updatedLib = { ...lib, territoryId: selectedId.current };
        // @ts-ignore
        actions={availableActions}
        onSelectionChange={(data: Library[]) => {
          data.map((lib) => {
            // @ts-ignore = this sneaks in here sometimes
            if (lib.tableData) delete lib.tableData;
            return lib;
          });
          selectedLibs.current = data;
        }}
      />
    </>
  );
};

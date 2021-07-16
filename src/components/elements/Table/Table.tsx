import React, { BaseSyntheticEvent, useEffect, useRef } from "react";
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
import TerritoryDropdown from "../../atoms/Dropdown/TerritoryDropdown";
import useTerritoriesQuery from "../../../queries/useTerritoriesQuery";
import useSaveLibraryQuery from "../../../queries/useSaveLibraryQuery";

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
  const { data } = useTerritoriesQuery();
  const selectedId = useRef<string>();
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

  const availableActions = manageTerritories
    ? [
        {
          position: "auto",
          icon: () => (
            // show dropdown here
            <TerritoryDropdown
              onChange={onTerritoryChange}
              options={data ?? []}
              currentValue={selectedId.current}
              // @ts-ignore
              style={{ minWidth: "150px" }}
            />
          ),
          onClick: (event: BaseSyntheticEvent, rowData: Library[]) => {
            rowData.forEach((lib) => {
              const updatedLib = { ...lib, territoryId: selectedId.current };
              saveLibrary(updatedLib);
            });
          },
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
        title={RefreshIconButton}
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
        // @ts-ignore
        actions={availableActions}
      />
    </>
  );
};

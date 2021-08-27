import React, { BaseSyntheticEvent, useEffect, useRef } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { Library } from "../../../model";
import { tableIcons } from "../tableIcons";
import moment from "moment";
import { getColor } from "../../../utils/colorUtils";
import TableHeader from "./TableHeader";
import useTableColumns from "./useTableColumns";
import TerritoryDropdown from "../../atoms/Dropdown/TerritoryDropdown";
import useTerritoriesQuery from "../../../queries/useTerritoriesQuery";
import useSaveLibraryQuery from "../../../queries/useSaveLibraryQuery";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { useNotification } from "../../atoms/Snackbar/Snackbar";

const StyledContainer = styled.div`
  display: flex;
  align-content: flex-start;
`;

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
  const { setError } = useNotification();

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
    if (selectedLibs.current?.length === 0) {
      setError("Please select some libraries to transfer!");
    }
    if (!selectedId.current) {
      setError("Please select a territory to move these to!");
    }
    console.log({ length: selectedLibs.current?.length });

    selectedLibs.current?.map((lib) => {
      const updatedLib = { ...lib, territoryId: selectedId.current };
      if (updatedLib.tableData) delete updatedLib.tableData;
      console.log({ updatedLib });
      // saveLibrary(updatedLib);
    });
  };

  const availableActions = [
    {
      // @ts-ignore
      icon: tableIcons.Create,
      tooltip: "Edit this library",
      // @ts-ignore
      onClick: (event, rowData) => onEdit(rowData),
      hidden: manageTerritories,
    },
  ];

  return (
    <>
      <TableHeader />
      <MaterialTable
        title=""
        columns={tableColumns}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              {manageTerritories && (
                <StyledContainer>
                  <TerritoryDropdown
                    onChange={onTerritoryChange}
                    options={data ?? []}
                    currentValue={selectedId.current}
                    // @ts-ignore
                    style={{ maxWidth: "150px" }}
                  />
                  <Button onClick={onSave}>Save</Button>
                </StyledContainer>
              )}
            </div>
          ),
        }}
        // maybe map through each of these, if success then set ONLY .checked to true??
        data={libraries?.map((lib) => {
          const isChecked: Library | undefined = selectedLibs.current.find(
            (l) => l._id === lib._id
          );

          return {
            ...lib,
            tableData: {
              checked: Boolean(isChecked),
            },
          };
        })}
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
        onSelectionChange={(libs) => {
          console.log("selected", libs);
          selectedLibs.current = libs;
        }}
      />
    </>
  );
};

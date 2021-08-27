import React, { useEffect, useState } from "react";
import FlexCenter from "../../../styles/FlexCenter";
import Territory from "../../../model/territory";
import StyledAutocomplete from "../../atoms/TextField/StyledAutocomplete";
import UserDAO from "../../../model/userDAO";
import MapTwoToneIcon from "@material-ui/icons/MapTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { Props as SaveProps } from "../../../queries/useSaveTerritoryMutation";
import { TextField } from "@material-ui/core";
import useDebounce from "../../../hooks/useDebounce";
import useDeleteTerritoryMutation from "../../../queries/useDeleteTerritoryMutation";
import ConfirmCloseDialog from "../../atoms/Dialogs/ConfirmCloseDialog";
import useConfirmDialog from "../../atoms/Dialogs/useConfirmDialog";
import ManageTerritoryDialog from "../../atoms/Dialogs/ManageTerritoryDialog";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-basis: 6em;
`;

interface Props {
  territory: Territory;
  territoryList: Territory[];
  repList: UserDAO[];
  saveTerritory(props: SaveProps): void;
}

export default ({ territory, repList, saveTerritory }: Props) => {
  const { mutate: deleteTerritory } = useDeleteTerritoryMutation();
  const [territoryName, setName] = useState<string>(territory.name);
  const currentRep = repList.find((r) => r._id === territory.repId);
  const { open, handleOpen, handleClose } = useConfirmDialog();
  const debouncedName = useDebounce<string>(territoryName, 2000);
  const {
    open: territoriesOpen,
    handleOpen: openTerritories,
    handleClose: closeTerritores,
  } = useConfirmDialog();

  useEffect(() => {
    if (debouncedName !== territory.name && debouncedName != null) {
      console.log({ debouncedName });
      saveTerritory({
        territory: {
          ...territory,
          name: debouncedName,
        },
      });
    }
  }, [debouncedName, saveTerritory, territory]);

  // debounce, otherwise there will be 100000 thousand of these being called..
  const onTerritoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setName(name);
  };
  const onRepChange = (_, newValue: UserDAO) => {
    if (newValue != null) {
      saveTerritory({
        territory: {
          ...territory,
          repId: newValue._id,
        },
      });
    }
  };

  const onOk = () => {
    deleteTerritory(territory);
  };

  return (
    <FlexCenter>
      <ManageTerritoryDialog
        open={territoriesOpen}
        handleClose={closeTerritores}
      />
      <ConfirmCloseDialog
        open={open}
        message={`Are you sure you want to delete the Territory ${territory.name}?`}
        onConfirm={onOk}
        onCancel={handleClose}
      />
      <Flex>
        <IconButton aria-label="delete territory" onClick={handleOpen}>
          <CloseIcon style={{ color: "red" }} fontSize="small" height="48px" />
        </IconButton>
        <div>Delete</div>
      </Flex>
      <Flex>
        <IconButton
          aria-label="manage all territories"
          onClick={openTerritories}
        >
          <MapTwoToneIcon fontSize="small" />
        </IconButton>
        <div>Transfer</div>
      </Flex>
      <TextField
        id="edit-territory"
        label="Territory Name"
        variant="outlined"
        value={territoryName}
        onChange={onTerritoryChange}
      />
      <StyledAutocomplete
        key={`${territory._id}-${territory.repId}`}
        value={currentRep}
        onChange={onRepChange}
        options={repList}
        getOptionLabel={(option: UserDAO) => option.firstName}
        label="Assigned Rep"
      />
    </FlexCenter>
  );
};

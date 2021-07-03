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

interface Props {
  territory: Territory;
  territoryList: Territory[];
  repList: UserDAO[];
  saveTerritory(props: SaveProps): void;
}

export default ({
  territory,
  territoryList,
  repList,
  saveTerritory,
}: Props) => {
  const [territoryName, setName] = useState<string>(territory.name);
  const currentRep = repList.find((r) => r._id === territory.repId);
  console.log({ territory });
  const [selectedRep, setRep] = React.useState<UserDAO>(currentRep);
  const debouncedName = useDebounce<string>(territoryName, 2000);

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

  return (
    <FlexCenter>
      <IconButton aria-label="delete territory">
        <CloseIcon style={{ color: "red" }} fontSize="small" />
      </IconButton>
      <MapTwoToneIcon />
      <TextField
        id="edit-territory"
        label="Territory Name"
        variant="outlined"
        value={territoryName}
        onChange={onTerritoryChange}
      />
      <StyledAutocomplete
        key={`${territory._id}-${territory.repId}`}
        value={selectedRep}
        onChange={onRepChange}
        options={repList}
        getOptionLabel={(option: UserDAO) => option.firstName}
        label="Assigned Rep"
      />
    </FlexCenter>
  );
};

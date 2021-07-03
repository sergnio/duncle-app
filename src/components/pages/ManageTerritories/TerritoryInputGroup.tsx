import React from "react";
import FlexCenter from "../../../styles/FlexCenter";
import Territory from "../../../model/territory";
import StyledAutocomplete from "../../atoms/TextField/StyledAutocomplete";
import UserDAO from "../../../model/userDAO";
import MapTwoToneIcon from "@material-ui/icons/MapTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { Props as SaveProps } from "../../../queries/useSaveTerritoryMutation";

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
  const [selectedTerritory, setTerritory] =
    React.useState<Territory>(territory);
  const currentRep = repList.find((r) => r._id === territory.repId);
  console.log({ territory });
  const [selectedRep, setRep] = React.useState<UserDAO>(currentRep);

  const onTerritoryChange = (_, chosenTerritory: Territory | null) => {
    // need to assign the new territory to the current user of that territory
    console.log({ chosenTerritory });
    // todo - only if it succeeds, then set this? or how to determine this...
    setTerritory(chosenTerritory);
    if (chosenTerritory != null) {
      const newAssignment: Territory = {
        ...territory,
        name: chosenTerritory.name,
      };
      console.log({ newAssignment });
      saveTerritory({ territory: newAssignment });
    }
  };
  const onRepChange = (_, newValue: UserDAO) => {
    console.log({ newValue });
    setRep(newValue);
  };

  return (
    <FlexCenter>
      <IconButton aria-label="delete territory">
        <CloseIcon style={{ color: "red" }} fontSize="small" />
      </IconButton>
      <MapTwoToneIcon />
      <h2>{territory.name}</h2>
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

import React from "react";
import FlexCenter from "../../../styles/FlexCenter";
import Territory from "../../../model/territory";
import StyledAutocomplete from "../../atoms/TextField/StyledAutocomplete";
import UserDAO from "../../../model/userDAO";
import useTerritoryGroup from "./useTerritoryGroup";

interface Props {
  territory: Territory;
  territoryList: Territory[];
  repList: UserDAO[];
}

export default ({ territory, territoryList, repList }: Props) => {
  const {
    selectedRep,
    repNames,
    onRepChange,
    selectedTerritory,
    territoryNames,
    onTerritoryChange,
  } = useTerritoryGroup(territory, territoryList, repList);

  return (
    <FlexCenter>
      <StyledAutocomplete
        value={selectedTerritory}
        onChange={onTerritoryChange}
        options={territoryNames}
        label="Territories"
      />
      <StyledAutocomplete
        value={selectedRep}
        onChange={onRepChange}
        options={repNames}
        label="Assigned Rep"
      />
    </FlexCenter>
  );
};

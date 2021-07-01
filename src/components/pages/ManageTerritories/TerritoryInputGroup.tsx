import React from "react";
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import FlexCenter from "../../../styles/FlexCenter";
import Territory from "../../../model/territory";
import StyledAutocomplete from "../../atoms/TextField/StyledAutocomplete";

interface Props {
  territory: Territory;
  territoryList: Territory[];
}

export default ({ territory: { name, repId }, territoryList }: Props) => {
  const [selectedTerritory, setTerritory] = React.useState<string | null>(name);
  const territoryNames = territoryList.map((t) => t.name);

  // todo - lookup rep from this id
  const reps = ["terry", "sam", "someone else"];
  const [selectedRep, setRep] = React.useState<string | null>(repId);

  const onTerritoryChange = (_, newValue: string | null) => {
    setTerritory(newValue);
  };
  const onRepChange = (_, newValue: string | null) => {
    setRep(newValue);
  };

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
        options={reps}
        label="Assigned Rep"
      />
    </FlexCenter>
  );
};

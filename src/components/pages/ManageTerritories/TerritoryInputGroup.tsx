import React from "react";
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import FlexCenter from "../../../styles/FlexCenter";
import Territory from "../../../model/territory";
import StyledAutocomplete from "../../atoms/TextField/StyledAutocomplete";
import UserDAO from "../../../model/userDAO";

interface Props {
  territory: Territory;
  territoryList: Territory[];
  repList: UserDAO[];
}

export default ({
  territory: { name, repId },
  territoryList,
  repList,
}: Props) => {
  const [selectedTerritory, setTerritory] = React.useState<string | null>(name);
  const territoryNames = territoryList.map((t) => t.name);
  const repNames = repList.map((r) => r.firstName);
  const { firstName } = repList.find((r) => r._id === repId);

  const [selectedRep, setRep] = React.useState<string | null>(firstName);

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
        options={repNames}
        label="Assigned Rep"
      />
    </FlexCenter>
  );
};

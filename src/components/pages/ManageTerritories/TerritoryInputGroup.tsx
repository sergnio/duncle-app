import React from "react";
import FlexCenter from "../../../styles/FlexCenter";
import Territory from "../../../model/territory";
import StyledAutocomplete from "../../atoms/TextField/StyledAutocomplete";
import UserDAO from "../../../model/userDAO";
import useSaveTerritoryMutation from "../../../queries/useSaveTerritoryMutation";

interface Props {
  territory: Territory;
  territoryList: Territory[];
  repList: UserDAO[];
}

export default ({ territory, territoryList, repList }: Props) => {
  const { mutate: saveTerritory, isIdle } = useSaveTerritoryMutation();
  const [selectedTerritory, setTerritory] =
    React.useState<Territory>(territory);
  const currentRep = repList.find((r) => r._id === territory.repId);

  const [selectedRep, setRep] = React.useState<UserDAO>(currentRep);

  // todo - make sure you're saving the entire object and not just the string
  const onTerritoryChange = (_, newValue: Territory) => {
    //  could just do a little lookup based off the first name to get the entire object..
    // and maybe call this in a useEffect if needed, since it _could_ fail
    setTerritory(newValue);
  };
  const onRepChange = (_, newValue: UserDAO) => {
    setRep(newValue);
  };

  return (
    <FlexCenter>
      <StyledAutocomplete<Territory>
        key={`${territory._id}-${territory.repId}-1`}
        value={selectedTerritory}
        onChange={onTerritoryChange}
        options={territoryList}
        getOptionLabel={(option: Territory) => option.name}
        label="Territories"
      />

      <StyledAutocomplete<UserDAO>
        key={`${territory._id}-${territory.repId}-2`}
        value={selectedRep}
        onChange={onRepChange}
        options={repList}
        getOptionLabel={(option: UserDAO) => option.firstName}
        label="Assigned Rep"
      />
    </FlexCenter>
  );
};

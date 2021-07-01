import React from "react";
import Territory from "../../../model/territory";
import UserDAO from "../../../model/userDAO";

export default (
  currentTerritory: Territory,
  territoryList: Territory[],
  repList: UserDAO[]
) => {
  const [selectedTerritory, setTerritory] = React.useState<string | null>(
    currentTerritory.name
  );
  const territoryNames = territoryList.map((t) => t.name);
  const repNames = repList.map((r) => r.firstName);
  const { firstName } = repList.find((r) => r._id === currentTerritory.repId);

  const [selectedRep, setRep] = React.useState<string | null>(firstName);

  // todo - make sure you're saving the entire object and not just the string
  const onTerritoryChange = (_, newValue: string | null) => {
    //  could just do a little lookup based off the first name to get the entire object..
    // and maybe call this in a useEffect if needed, since it _could_ fail
    setTerritory(newValue);
  };
  const onRepChange = (_, newValue: string | null) => {
    setRep(newValue);
  };

  return {
    selectedTerritory,
    onTerritoryChange,
    territoryNames,
    selectedRep,
    repNames,
    onRepChange,
  };
};

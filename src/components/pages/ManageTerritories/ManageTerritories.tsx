import React from "react";
import Card from "@material-ui/core/Card";
import FlexCenter from "../../../styles/FlexCenter";
import CardContent from "@material-ui/core/CardContent";
import TerritoryInputGroup from "./TerritoryInputGroup";
import Territory from "../../../model/territory";
import useTerritoriesQuery from "../../../queries/useTerritoriesQuery";

export default () => {
  const x = useTerritoriesQuery();
  const mockTerritories: Territory[] = [
    { name: "North", repId: "org.duncle.j" },
    { name: "East", repId: "org.duncle.sam" },
    { name: "West", repId: "org.duncle.jim" },
  ];
  return (
    <>
      <h1>Manage Territories</h1>
      <FlexCenter>
        <Card style={{ maxWidth: "1300px" }}>
          <CardContent>
            {mockTerritories.map((t) => (
              <TerritoryInputGroup
                // @ts-ignore
                key={t}
                territory={t}
                territoryList={mockTerritories}
              />
            ))}
          </CardContent>
        </Card>
      </FlexCenter>
    </>
  );
};

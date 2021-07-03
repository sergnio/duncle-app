import React from "react";
import Card from "@material-ui/core/Card";
import FlexCenter from "../../../styles/FlexCenter";
import CardContent from "@material-ui/core/CardContent";
import TerritoryInputGroup from "./TerritoryInputGroup";
import useTerritoriesQuery from "../../../queries/useTerritoriesQuery";
import useUsersQuery from "../../../queries/useUsersQuery";
import Add from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import FlexStart from "../../../styles/FlexStart";

export default () => {
  const { data, isLoading, isSuccess, isError } = useTerritoriesQuery();
  const { data: usersData, isSuccess: userSuccess } = useUsersQuery();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <h1>Manage Territories</h1>
      <FlexCenter>
        <Card style={{ maxWidth: "1300px" }}>
          <CardContent>
            <FlexStart>
              <Button size="small">
                <Add style={{ color: "green" }} /> Add territory
              </Button>
            </FlexStart>
            {isSuccess &&
              userSuccess &&
              data.map((t) => (
                <TerritoryInputGroup
                  // @ts-ignore
                  key={t}
                  territory={t}
                  territoryList={data}
                  repList={usersData}
                />
              ))}
            {isError && !isLoading && <h1>Error</h1>}
          </CardContent>
        </Card>
      </FlexCenter>
    </>
  );
};

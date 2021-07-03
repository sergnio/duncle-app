import React, { FormEventHandler, useState } from "react";
import Card from "@material-ui/core/Card";
import FlexCenter from "../../../styles/FlexCenter";
import CardContent from "@material-ui/core/CardContent";
import TerritoryInputGroup from "./TerritoryInputGroup";
import useTerritoriesQuery from "../../../queries/useTerritoriesQuery";
import useUsersQuery from "../../../queries/useUsersQuery";
import Add from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import FlexStart from "../../../styles/FlexStart";
import { TextField } from "@material-ui/core";
import useSaveTerritoryMutation from "../../../queries/useSaveTerritoryMutation";
import Territory from "../../../model/territory";
import { v4 as uuidv4 } from "uuid";

export default () => {
  const { data, isLoading, isSuccess, isError } = useTerritoriesQuery();
  const {
    data: usersData,
    isSuccess: usersSuccess,
    isLoading: usersIsLoading,
  } = useUsersQuery();
  const { mutate: saveTerritory } = useSaveTerritoryMutation();

  const [newTerritory, setNewTerritory] = useState(false);
  const [territoryName, setTerritoryName] = React.useState<string | null>(null);

  if (isLoading || usersIsLoading) return <h1>Loading...</h1>;

  const submitNewTerritory = (event) => {
    event.preventDefault();
    const inputValue: string = event.target[0].value;
    saveTerritory({
      // this is cheating...
      territory: { name: inputValue, _id: uuidv4() } as Territory,
      isExisting: false,
    });
    setNewTerritory(!newTerritory);
  };

  const updateNewTerritory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerritoryName(event.target.value);
  };

  const addTerritory = () => {
    setNewTerritory(!newTerritory);
  };

  const shouldShowTerritoriesList =
    isSuccess && usersSuccess && data && usersData;

  return (
    <>
      <h1>Manage Territories</h1>
      <FlexCenter>
        <Card style={{ maxWidth: "1300px" }}>
          <CardContent>
            <FlexStart>
              <Button
                size="small"
                onClick={addTerritory}
                style={{ marginRight: "48px" }}
              >
                <Add style={{ color: "green" }} /> Add territory
              </Button>
              {newTerritory && (
                <form autoComplete="off" onSubmit={submitNewTerritory}>
                  <FlexCenter>
                    <TextField
                      id="new-territory"
                      label="New Territory"
                      variant="outlined"
                      value={territoryName}
                      onChange={updateNewTerritory}
                    />
                    <Button size="small" type="submit">
                      <CheckIcon style={{ color: "green" }} /> Save
                    </Button>
                  </FlexCenter>
                </form>
              )}
            </FlexStart>
            {shouldShowTerritoriesList ? (
              data.map((t) => (
                <TerritoryInputGroup
                  // @ts-ignore
                  key={t}
                  territory={t}
                  territoryList={data}
                  repList={usersData}
                  saveTerritory={saveTerritory}
                />
              ))
            ) : (
              <h1>Add a new territory!</h1>
            )}
            {isError && !isLoading && <h1>Error</h1>}
          </CardContent>
        </Card>
      </FlexCenter>
    </>
  );
};

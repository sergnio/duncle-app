import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Card, TextField } from "@material-ui/core";
import FlexCenter from "../../../styles/FlexCenter";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";

export default () => {
  const territories = ["East", "West", "North"];
  const reps = ["terry", "sam", "someone else"];
  return (
    <>
      <h1>Manage Territories</h1>
      <Card>
        <CardContent>
          <FlexCenter>
            <Box padding={3}>
              <Autocomplete
                id="territories"
                options={territories}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Territories"
                    variant="outlined"
                  />
                )}
              />
            </Box>

            <div>
              <Autocomplete
                id="assignedRep"
                options={reps}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assigned Rep"
                    variant="outlined"
                  />
                )}
              />
            </div>
          </FlexCenter>
        </CardContent>
      </Card>
    </>
  );
};

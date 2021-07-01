import React from "react";
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import FlexCenter from "../../../styles/FlexCenter";
import Territory from "../../../model/territory";

interface Props {
  territory: Territory;
  territoryList: Territory[];
}

export default ({ territory: { name, repId }, territoryList }: Props) => {
  const [value, setValue] = React.useState<string | null>(name);
  const [inputValue, setInputValue] = React.useState(name);

  const territoryNames = territoryList.map((t) => t.name);

  const reps = ["terry", "sam", "someone else"];
  return (
    <FlexCenter>
      <Box padding={3}>
        <Autocomplete
          value={value}
          onChange={(_, newValue: string | null) => {
            console.log({ newValue });
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            console.log({ newInputValue });
            setInputValue(newInputValue);
          }}
          id="territories"
          options={territoryNames}
          // getOptionLabel={(option) => option.toString()}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Territories" variant="outlined" />
          )}
        />
      </Box>
      <Box padding={3}>
        <Autocomplete
          id="assignedRep"
          options={reps}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Assigned Rep" variant="outlined" />
          )}
        />
      </Box>
    </FlexCenter>
  );
};

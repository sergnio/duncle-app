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
  const [value, setValue] = React.useState<string | null>(name);
  const [inputValue, setInputValue] = React.useState(name);

  const territoryNames = territoryList.map((t) => t.name);

  const onValueChange = (_, newValue: string | null) => {
    console.log({ newValue });
    setValue(newValue);
  };
  const onDisplayChange = (event, newInputValue) => {
    console.log({ newInputValue });
    setInputValue(newInputValue);
  };

  const reps = ["terry", "sam", "someone else"];
  return (
    <FlexCenter>
      <StyledAutocomplete
        autocompleteValue={value}
        displayValue={inputValue}
        onDisplayChange={onDisplayChange}
        onValueChange={onValueChange}
        options={territoryNames}
        label="Territories"
      />
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

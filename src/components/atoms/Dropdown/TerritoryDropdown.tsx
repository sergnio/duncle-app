import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Territory from "../../../model/territory";

export default () => {
  const mockTerritories: Territory[] = [
    {
      _id: "bogus",
      _rev: "bogus",
      repId: "repid",
      name: "name",
    },
    {
      _id: "bogus",
      _rev: "bogus",
      repId: "repid2",
      name: "name2",
    },
  ];

  return (
    <TextField
      id="territory-dropdown"
      select
      label="Territory"
      fullWidth={true}
      margin="normal"
      // value={currency}
      // onChange={handleChange}
      variant="outlined"
    >
      {mockTerritories.map((option) => (
        <MenuItem key={option.name} value={option.name}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import styled from "styled-components";
import { useSeeOthersState } from "../../../common/providers/SeeOthersProvider";
import useAuth from "../../../common/hooks/Auth/useAuth";

const FlexGroup = styled(FormGroup)`
  display: flex;
  justify-content: center;
`;

export default () => {
  const { checked, setChecked } = useSeeOthersState();
  const { getAuthenticatedUser } = useAuth();
  const isAdmin = getAuthenticatedUser()?.role === "admin";
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /** When this changes, we should add/remove some data from the table
     */
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  return (
    <>
      {isAdmin && (
        <FlexGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.checkedTerry}
                onChange={handleChange}
                name="checkedTerry"
                color="primary"
              />
            }
            label="Terry"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.checkedSam}
                onChange={handleChange}
                name="checkedSam"
              />
            }
            label="Sam"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.checkedJim}
                onChange={handleChange}
                name="checkedJim"
              />
            }
            label="Jim"
          />
        </FlexGroup>
      )}
    </>
  );
};

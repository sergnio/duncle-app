import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from "@material-ui/core";
import styled from "styled-components";
import { useSeeOthersState } from "../../../providers/SeeOthersProvider";
import useAuth from "../../../hooks/Auth/useAuth";
import useUsersQuery from "../../../queries/useUsersQuery";

const FlexGroup = styled(FormGroup)`
  display: flex;
  justify-content: center;
`;

export default () => {
  const { getAuthenticatedUser } = useAuth();
  const user = getAuthenticatedUser();
  // todo - rename to filters?
  const { selectedUsers, toggleCheckbox } = useSeeOthersState();
  const isAdmin = user?.role === "admin";
  const { data, isLoading, isSuccess, isError } = useUsersQuery(true);

  const error = selectedUsers.length < 1;

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {data && isSuccess && isAdmin && (
        <FlexGroup row>
          <FormControl required error={error}>
            <FlexGroup row>
              {data.map(({ _id, firstName }) => (
                <FormControlLabel
                  key={_id}
                  control={
                    <Checkbox
                      checked={selectedUsers.includes(_id)}
                      onChange={toggleCheckbox}
                      name={_id}
                      color="primary"
                    />
                  }
                  label={firstName}
                />
              ))}
            </FlexGroup>
            <FlexGroup row>
              <FormHelperText>Please select at least one option</FormHelperText>
            </FlexGroup>
          </FormControl>
        </FlexGroup>
      )}
      {isError && <p>Error loading...</p>}
    </>
  );
};

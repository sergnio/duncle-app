import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useQueryClient } from "react-query";
import { useNotification } from "../Snackbar/Snackbar";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  left: 1em;
  margin-top: 5px;
`;

export default () => {
  const queryClient = useQueryClient();
  const { setSuccess, setError } = useNotification();

  const onRefresh = async () => {
    try {
      await queryClient.refetchQueries({ active: true });
      setSuccess("Successfully refreshed all data");
    } catch (e) {
      setError(`Failed to refresh data: ${e}`);
    }
  };

  return (
    <Container>
      <Button
        onClick={onRefresh}
        variant="outlined"
        style={{ color: "white", borderColor: "red" }}
      >
        <Tooltip title="Get the newest data" placement="bottom">
          <>
            Refresh data <RefreshIcon />
          </>
        </Tooltip>
      </Button>
    </Container>
  );
};

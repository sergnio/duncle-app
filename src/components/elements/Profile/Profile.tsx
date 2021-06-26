import MUIButton from "@material-ui/core/Button";
import React from "react";
import styled from "styled-components";
import NavigationLink from "../../styles/NavigationLink";
import useAuth from "../../../hooks/Auth/useAuth";

const Container = styled.div`
  position: absolute;

  @media (max-width: 768px) {
    right: 1em;
  }

  right: 2em;
  margin-top: 5px;
`;

const Button = styled(MUIButton)`
  color: white;
  border-color: white;
`;

export default () => {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <Container>
      {isAuthenticated() ? (
        <Button variant="outlined" onClick={signOut}>
          Sign Out
        </Button>
      ) : (
        <NavigationLink toRoute="/">
          <Button variant="outlined">Not signed in</Button>
        </NavigationLink>
      )}
    </Container>
  );
};

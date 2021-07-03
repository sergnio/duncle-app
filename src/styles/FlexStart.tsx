import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const FlexStart = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export default ({ children }: PropsWithChildren<any>) => (
  <FlexStart>{children}</FlexStart>
);

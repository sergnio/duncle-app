import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components";

export const flexCenterCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FlexCenter = styled.div<Props>`
  ${flexCenterCss};
  // If a height is passed in, use it. Otherwise just default to auto
  height: ${({ height }) => (height ? height : "auto")};
`;

interface Props extends PropsWithChildren<any> {
  height?: string | number;
}

export default ({ children, height }: Props) => (
  <FlexCenter height={height}>{children}</FlexCenter>
);

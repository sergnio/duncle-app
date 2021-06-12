import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HasChildrenProps } from "../../duncleTypes";

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

interface Props extends HasChildrenProps {
  toRoute: string;
}

export default function ({ children, toRoute }: Props) {
  return <StyledLink to={toRoute}>{children}</StyledLink>;
}

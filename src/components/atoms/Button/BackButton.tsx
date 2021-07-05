import React from "react";
import DefaultButton from "./DefaultButton";
import { useHistory } from "react-router-dom";

export default () => {
  const { goBack } = useHistory();
  return <DefaultButton onClick={goBack}>Back</DefaultButton>;
};

import React from "react";
import CustomTextField from "../../atoms/TextField/CustomTextField";
import Grid from "@material-ui/core/Grid/Grid";
import { Typography } from "@material-ui/core";
import useStyles from "../../../global-styles";
import FormSubmitButton from "../../atoms/Button/FormSubmitButton";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 40px;
`;

export default function (props: any) {
  const { user } = props;
  const { handleSubmit } = props;
  const { paddingRight, form } = useStyles();
  const isRequired = true;

  const personalFields = [
    // personal info
    { label: "Library Name", isRequired },
    { label: "Librarian", isRequired },
    { label: "Assistant" },
    { label: "Email", isRequired },
    { label: "Phone Number", isRequired },
    { label: "Extension" },
  ];
  const addressFields = [
    // address
    { label: "Street", isRequired },
    { label: "City", isRequired },
    { label: "County", isRequired },
    { label: "District", isRequired },
    { label: "Zip", isRequired },
    { label: "State", isRequired },
  ];
  const otherFields = [
    // other
    { label: "Level" },
    { label: "Size" },
  ];

  return (
    <form className={form} noValidate onSubmit={handleSubmit}>
      <Grid container justify="center">
        <Typography component="h1" variant="h5">
          Rep: {user.username}
        </Typography>
      </Grid>
      <Grid container justify="center">
        <Flex>
          {personalFields.map(({ label, isRequired }) => (
            <Grid item xs={3} md={2} key={label} className={paddingRight}>
              <CustomTextField
                key={label}
                name={label}
                isRequired={isRequired}
              />
            </Grid>
          ))}
        </Flex>
        <Flex>
          {addressFields.map(({ label, isRequired }) => (
            <Grid item xs={3} md={2} key={label} className={paddingRight}>
              <CustomTextField
                key={label}
                name={label}
                isRequired={isRequired}
              />
            </Grid>
          ))}
        </Flex>
        <Flex>
          {otherFields.map(({ label }) => (
            <Grid item xs={6} key={label} className={paddingRight}>
              <CustomTextField key={label} name={label} />
            </Grid>
          ))}
        </Flex>
      </Grid>
      <FormSubmitButton DisplayText="Create Library" />
    </form>
  );
}

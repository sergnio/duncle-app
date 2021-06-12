import React from "react";
import useStyles from "../../global-styles";
import Typography from "@material-ui/core/Typography";
import Form from "../../common/Form";
import DatePicker from "../atoms/DatePicker/DatePicker";
import DefaultButton from "../atoms/Button/DefaultButton";

interface Props {
  title: string;
  handleSubmit(props: any): any;
}

const NO_APPOINTMENT = "";

export default function ({ title, handleSubmit }: Props) {
  const { paddingTop } = useStyles();

  const cancelAppointment = () =>
    handleSubmit({ nextAppointment: NO_APPOINTMENT });

  return (
    <div className={paddingTop}>
      <Typography variant="h6" style={{ color: "black" }}>
        {title}
      </Typography>
      <div className={paddingTop}>
        <Form onSubmit={handleSubmit}>
          <DatePicker />
          <DefaultButton type="submit">Schedule</DefaultButton>
          {/* only show on the Schedule Next Contact */}
          {title === "Schedule Next Contact" && (
            <DefaultButton onClick={cancelAppointment} color="secondary">
              Clear Date
            </DefaultButton>
          )}
        </Form>
      </div>
    </div>
  );
}

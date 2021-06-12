import moment from "moment";

export const getColor = (meetingTime?: Date): string => {
  const currentDate: Date = moment().toDate();
  const nextMonth = moment(currentDate).add(1, "month");

  // Need this to perform comparisons
  const momentDate = moment(meetingTime);
  const green = "rgba(76,175,80,0.68)";
  const red = "rgba(219,16,16,0.78)";
  const yellow = "rgba(255,244,57,0.64)";

  if (momentDate.isBefore(currentDate, "month")) {
    return red;
  } else if (momentDate.isSame(currentDate, "month")) {
    return green;
  } else if (momentDate.isSame(nextMonth, "month")) {
    return yellow;
  } else {
    return "white";
  }
};

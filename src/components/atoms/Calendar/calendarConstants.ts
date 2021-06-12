import moment from "moment";

export const events = [
  {
    start: moment().toISOString(),
    end: moment().add(1, "days").toDate(),
    title: "Iso date",
  },
  {
    start: moment().add(2, "days").toDate(),
    end: moment().add(4, "days").toDate(),
    title: "3 day event, after the two day event",
  },
];

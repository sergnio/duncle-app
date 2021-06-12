import React from "react";
import UserEvents from "./UserEvents";
import moment from "moment";

export default {
  title: "Atoms/UserEvents",
};

function createData(title: string, start: Date, rep: string) {
  return { title, start, rep };
}

const normalDate = moment().toDate();
console.log("normal date here");
console.log(normalDate);

const date = moment().format();
console.log("date here");
console.log(date);

const month = moment(date).format("MMMM do, H:mm");
console.log("month here");
console.log(month);

const rows = [
  // have one last month, this month, and next month
  createData("Lakeville North", normalDate, "Terry"),
  createData(
    "Should be red, one month old",
    moment().subtract(1, "month").toDate(),
    "Terry"
  ),
  createData(
    "Should be yellow, one month ahead",
    moment().add(1, "month").toDate(),
    "Terry"
  ),
  createData("Should be green, this is today", normalDate, "Terry"),
];

export const Default = () => <UserEvents events={rows} />;

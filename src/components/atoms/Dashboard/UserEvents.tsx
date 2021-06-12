import React from "react";
import Table from "@material-ui/core/Table";
import { TableContainer } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import moment from "moment";

interface Props {
  events: {
    title: string;
    start: Date;
    rep: string;
  }[];
}

export default function UserEvents({ events }: Props) {
  console.log("wtf is ", events);
  events.sort((a, b) => {
    // @ts-ignore
    return a.start - b.start;
  });

  /*
   * Deprecated
   */
  function getColor(meetingTimeMonth: number): string {
    const currentMonth: number = moment().toDate().getMonth();
    if (currentMonth > meetingTimeMonth) {
      return "red";
    } else if (currentMonth === meetingTimeMonth) {
      return "#4caf50";
      // maybe this should just be white
    } else if (currentMonth + 1 === meetingTimeMonth) {
      return "yellow";
    } else {
      return "white";
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Meeting Title</b>
            </TableCell>
            <TableCell>
              <b>Meeting Time</b>
            </TableCell>
            <TableCell>
              <b>Rep</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map(({ title, start, rep }) => {
            const backgroundColor: string = getColor(start.getMonth());

            // see docs for further details - https://momentjs.com/docs/#/displaying/format/
            const readableFormat = moment(start).format("MMMM do, H:mm");
            return (
              <TableRow key={title} style={{ background: backgroundColor }}>
                <TableCell component="th" scope="row">
                  {title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {readableFormat}
                </TableCell>
                {/* Consider adding an end date too */}
                <TableCell component="th" scope="row">
                  {rep}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import React from "react";
import Calendar from "./Calendar";
import event from "../../../model/event";
import useAuth from "../../../common/hooks/Auth/useAuth";

export default () => {
  const { getAuthenticatedUser } = useAuth();
  const user = getAuthenticatedUser();

  const filteredEvents = user?.events.map(
    ({ id, title, start, end }: event) => ({ id, title, start, end })
  );
  return <Calendar initialEvents={filteredEvents} />;
};

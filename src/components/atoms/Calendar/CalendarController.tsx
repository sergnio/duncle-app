import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { TrimmedEvent } from "../../../model/event";
import useAuth from "../../../hooks/Auth/useAuth";
import useUsersQuery from "../../../queries/useUsersQuery";
import useSaveUsers from "../../../queries/useSaveUsersMutation";
import { useSeeOthersState } from "../../../providers/SeeOthersProvider";

export default () => {
  const INITIAL_EVENT_STATE: TrimmedEvent[] = [];
  const [events, setEvents] = useState<TrimmedEvent[]>(INITIAL_EVENT_STATE);
  const { getAuthenticatedUser } = useAuth();
  const { selectedUsers } = useSeeOthersState();
  const { data } = useUsersQuery(false, selectedUsers);
  const { mutate } = useSaveUsers();
  const currentUser = getAuthenticatedUser();

  // todo - why does this need to be in a useEffect?
  useEffect(() => {
    let allEvents: TrimmedEvent[] = [];

    if (data && currentUser?.username != null) {
      data.forEach((user) => {
        const currentUserEvents = user.events;
        allEvents = [...allEvents, ...currentUserEvents];
      });
    } else {
      console.warn("No events were present");
    }

    setEvents(allEvents);
  }, [selectedUsers, data, currentUser.username]);

  return (
    <Calendar
      initialEvents={events}
      updateUser={mutate}
      currentUser={currentUser}
    />
  );
};

import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import event, { TrimmedEvent } from "../../../model/event";
import useAuth from "../../../common/hooks/Auth/useAuth";
import useUsersQuery from "../../../common/queries/useUsersQuery";
import useSaveUsers from "../../../common/queries/useSaveUsersMutation";
import { useSeeOthersState } from "../../../common/providers/SeeOthersProvider";
import {
  getUserData,
  getUserEvents,
  PouchResponse,
} from "../../../common/queries/queriesUtils";
import UserDAO from "../../../model/userDAO";

export default () => {
  const INITIAL_EVENT_STATE: TrimmedEvent[] = [];
  const [events, setEvents] = useState<TrimmedEvent[]>(INITIAL_EVENT_STATE);
  const { getAuthenticatedUser } = useAuth();
  const { checked } = useSeeOthersState();
  // step 1, get from reactQuery
  const { data } = useUsersQuery();
  // step 2, todo save using reactQuery
  const { mutate } = useSaveUsers();
  const currentUser = getAuthenticatedUser();
  let fromRQ;
  if (data && data.rows) {
    console.log("is data.rows defined", data.rows);
    fromRQ = getUserData(currentUser?.username, data);
  }

  // todo - why does this need to be in a useEffect?
  useEffect(() => {
    let allEvents: TrimmedEvent[] = [];

    if (data && checked.checkedTerry && fromRQ?.username != null) {
      const currentUserEvents = getUserEvents(fromRQ.username, data);
      allEvents = [...allEvents, ...currentUserEvents];
    } else {
      console.warn("No events were present");
    }

    if (checked.checkedSam) {
      const samEvents = getUserEvents("sam", data);
      allEvents = [...allEvents, ...samEvents];
    }

    if (checked.checkedJim) {
      const jimEvents = getUserEvents("jim", data);
      console.log({ jimEvents });
      allEvents = [...allEvents, ...jimEvents];
    }

    setEvents(allEvents);
  }, [checked, data]);

  return (
    <Calendar initialEvents={events} updateUser={mutate} currentUser={fromRQ} />
  );
};

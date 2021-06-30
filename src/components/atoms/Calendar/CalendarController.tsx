import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { TrimmedEvent } from "../../../model/event";
import useAuth from "../../../hooks/Auth/useAuth";
import useUsersQuery from "../../../queries/useUsersQuery";
import useSaveUsers from "../../../queries/useSaveUsersMutation";
import { useSeeOthersState } from "../../../providers/SeeOthersProvider";
import { getUserData, getUserEvents } from "../../../queries/queriesUtils";

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
  //  @ts-ignore todo - fix this
  if (data && data.rows && !fromRQ) {
    //  @ts-ignore todo - fix this
    fromRQ = getUserData(currentUser?.username, data);
  }

  // todo - why does this need to be in a useEffect?
  useEffect(() => {
    let allEvents: TrimmedEvent[] = [];

    //  @ts-ignore todo - fix this
    if (data && checked.checkedUser && fromRQ?.username != null) {
      //  @ts-ignore todo - fix this
      const currentUserEvents = getUserEvents(fromRQ.username, data);
      allEvents = [...allEvents, ...currentUserEvents];
    } else {
      console.warn("No events were present");
    }

    //  @ts-ignore todo - fix this
    if (checked.checkedSam) {
      //  @ts-ignore todo - fix this
      const samEvents = getUserEvents("sam", data);
      allEvents = [...allEvents, ...samEvents];
    }

    //  @ts-ignore todo - fix this
    if (checked.checkedJim) {
      //  @ts-ignore todo - fix this
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

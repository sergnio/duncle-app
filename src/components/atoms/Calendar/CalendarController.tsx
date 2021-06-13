import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import event, { TrimmedEvent } from "../../../model/event";
import useAuth from "../../../common/hooks/Auth/useAuth";
import useUsersQuery from "../../../common/queries/useUsersQuery";
import { useSeeOthersState } from "../../../common/providers/SeeOthersProvider";
import { PouchResponse } from "../../../common/queries/queriesUtils";
import UserDAO from "../../../model/userDAO";

const getUserEvents = (
  user: "jim" | "sam" | string,
  userData: PouchResponse<UserDAO>
) => userData.rows.filter((d) => d.doc.username === user)[0].doc.events;

export default () => {
  const INITIAL_EVENT_STATE: TrimmedEvent[] = [];
  const [events, setEvents] = useState<TrimmedEvent[]>(INITIAL_EVENT_STATE);
  console.log("wtf are these events rn", events);
  const { getAuthenticatedUser } = useAuth();
  const { data } = useUsersQuery();
  const { checked } = useSeeOthersState();

  // todo - why does this need to be in a useEffect?
  useEffect(() => {
    const user = getAuthenticatedUser();

    // eslint-disable-next-line
    let allEvents: TrimmedEvent[] = [];

    if (data && checked.checkedTerry && user?.username != null) {
      console.log("checked terry");
      const currentUserEvents = getUserEvents(user.username, data);
      allEvents = [...allEvents, ...currentUserEvents];
    } else {
      console.log("No events were present");
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
    <>
      {/*
        todo - this seems really bad..
          since we're making an "api" call to grab the events +
          using initial events seems to only render the calendar once,
          events list will be empty the first time we render this calendar (normally).
          Because of this, we only render it with an empty list, and not after we've retrieved our data.
       */}
      {events === INITIAL_EVENT_STATE ? null : (
        <Calendar initialEvents={events} />
      )}
    </>
  );
};

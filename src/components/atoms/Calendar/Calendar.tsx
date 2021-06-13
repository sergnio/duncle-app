import React, { useEffect, useRef, useState } from "react";
import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import DateTimeDialog, { DateDialogReturn } from "../Dialogs/DateTimeDialog";
import { v4 as uuidv4 } from "uuid";

import "./main.css";
import event from "../../../model/event";
import { dateNowIso, readableDate } from "../../../utils/dateUtil";
import UserDAO from "../../../model/userDAO";
import { useNotification } from "../Snackbar/Snackbar";
import AdminCheckboxes from "../../elements/AdminCheckboxes/AdminCheckboxes";

interface Props {
  initialEvents: any[];
  updateUser(user: UserDAO): void;
  currentUser: UserDAO;
}

// todo - fix this
export default function ({ initialEvents, updateUser, currentUser }: Props) {
  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
  const [_, setCurrentEvents] = useState<EventApi[]>([]);
  const [selectedDates, setSelectedDates] = useState<DateSelectArg>();
  const { setSuccess, setError } = useNotification();

  const [isOpen, setOpen] = React.useState<boolean>(false);
  const calRef = useRef<FullCalendar>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {
    initialEvents.forEach(() => {
      if (calRef != null && calRef.current != null) {
        const api = calRef.current.getApi();
        api.removeAllEvents();

        initialEvents.forEach((ev) => {
          api.addEvent(ev);
        });
      }
    });
  }, [initialEvents]);

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setOpen(true);
    setSelectedDates(selectInfo);
  };

  const handleSubmit = async ({ appointmentTitle }: DateDialogReturn) => {
    console.log({ appointmentTitle });
    //// add to calendar events
    const { calendar } = selectedDates.view;
    calendar.unselect(); // clear date selection

    if (selectedDates && currentUser) {
      console.log({ selectedDates });

      const newId = uuidv4();
      const startDate = selectedDates.startStr;
      const endDate = selectedDates.endStr;
      const now = dateNowIso();

      const newEvent: event = {
        id: newId,
        title: appointmentTitle,
        start: startDate,
        end: endDate,
        libraryId: "NEED LIB ID",
        hasContacted: false,
        dateCreated: now,
        dateUpdated: now,
      };

      console.log("is currentUser defined", currentUser);
      const editedUser = { ...currentUser };
      editedUser.events = [...currentUser.events, newEvent];
      updateUser(editedUser);

      try {
        setSuccess(`Successfully added event for: ${readableDate(startDate)}`);
      } catch (e) {
        setError(`Unable to add appointment: ${e}`);
      }

      // todo - update this only on success
      calendar.addEvent({
        id: newId,
        title: appointmentTitle,
        // todo - set date from nextAppointment
        start: startDate,
        end: endDate,
        allDay: false,
      });
    }
    setOpen(false);
  };

  const cancel = () => setOpen(false);

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      // @ts-ignore
      // eslint-disable-next-line
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  return (
    <div className="demo-app">
      <DateTimeDialog
        isOpen={isOpen}
        handleSubmit={handleSubmit}
        handleCancel={cancel}
      />
      <div className="demo-app-main">
        <AdminCheckboxes />
        <FullCalendar
          ref={calRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /**
          eventChange={function (eventChange) {
            console.log({ eventChange });
          }}
          eventAdd={function (eventAdd) {
            console.log({ eventAdd });
          }}
          */
          /* you can update a remote database when these fire:
                    eventRemove={function(){}}
                    */
        />
      </div>
    </div>
  );

  function renderEventContent(eventContent: EventContentArg) {
    return (
      <>
        <strong>{eventContent.timeText}</strong>
        <i>{eventContent.event.title}</i>
      </>
    );
  }
}

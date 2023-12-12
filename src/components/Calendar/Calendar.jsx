import React, { useContext, useEffect, useState } from "react";
import {
  Calendar as CalendarComponent,
  momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { EventContext } from "../../store/Events";

const localizer = momentLocalizer(moment);
export function Calendar() {
  const { eventList, loadEvents } = useContext(EventContext);

  const [events, setEvents] = useState(eventList);
  useEffect(() => {
    if (eventList.length) {
      const newEvents = eventList?.map((e) => {
        return {
          ...e,
          start: new Date(e.start),
          end: new Date(e.end),
        };
      });

      setEvents(newEvents);
    } else {
      loadEvents();
    }
  }, [eventList]);

  return (
    <div style={{ height: "100vh" }}>
      <CalendarComponent
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
          },
        })}
      />
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
        onSelectEvent={(event) => navigate(`/event/${event.id}`)}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
          },
        })}
      />
    </div>
  );
}

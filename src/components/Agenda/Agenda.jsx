import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);
export function Agenda({ myEvents }) {
  const navigate = useNavigate();
  const [events, setEvents] = useState();

  useEffect(() => {
    const newEvents = myEvents?.map((e) => {
      return {
        ...e,
        start: new Date(e.start),
        end: new Date(e.end),
      };
    });
    setEvents(newEvents);
  }, [myEvents]);

  return (
    <div className="h-full">
      {events && (
        <Calendar
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
      )}
    </div>
  );
}

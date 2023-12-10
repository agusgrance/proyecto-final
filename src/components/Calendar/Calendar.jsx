import React, { useEffect, useState } from "react";
import {
  Calendar as CalendarComponent,
  momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);
export function Calendar() {
  const events = [
    {
      title: "Evento 1",
      start: new Date(2023, 11, 1),
      end: new Date(2023, 11, 3),
      color: "green",
    },
    {
      title: "Evento 2",
      start: new Date(2023, 11, 7),
      end: new Date(2023, 11, 10),
      color: "blue",
    },
    // Agrega más eventos según sea necesario
  ];

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

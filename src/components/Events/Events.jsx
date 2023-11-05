import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, getJson, Toast, localeEs } from "@mobiscroll/react";

export function Events() {
  const [myEvents, setEvents] = React.useState([]);
  const [isToastOpen, setToastOpen] = React.useState(false);
  const [toastText, setToastText] = React.useState();

  React.useEffect(() => {
    getJson(
      "https://trial.mobiscroll.com/events/?vers=5",
      (events) => {
        setEvents(events);
      },
      "jsonp"
    );
  }, []);

  const closeToast = React.useCallback(() => {
    setToastOpen(false);
  }, []);

  const onEventClick = React.useCallback((event) => {
    setToastText(event.event.title);
    setToastOpen(true);
  }, []);

  const view = React.useMemo(() => {
    return {
      calendar: { type: "week" },
      agenda: { type: "day" },
    };
  }, []);

  return (
    <div>
      <Eventcalendar
        theme="windows"
        themeVariant="light"
        locale={localeEs}
        data={myEvents}
        view={view}
        onEventClick={onEventClick}
      />
      <Toast
        theme="windows"
        themeVariant="light"
        message={toastText}
        isOpen={isToastOpen}
        onClose={closeToast}
      />
    </div>
  );
}

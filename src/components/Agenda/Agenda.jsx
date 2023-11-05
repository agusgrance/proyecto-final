import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, Page, setOptions, localeEs } from "@mobiscroll/react";

setOptions({
  locale: localeEs,
  theme: "ios",
  themeVariant: "light",
});

export function Agenda({ myEvents }) {
  const dayView = React.useMemo(() => {
    return {
      calendar: { type: "week" },
      agenda: { type: "day" },
    };
  }, []);

  return (
    <Page className="h-full ">
      <Eventcalendar
        className="rounded-lg shadow-2xl p-6 bg-white"
        view={dayView}
        onEventDoubleClick={(e) => console.log("controlar evento", e)}
        data={myEvents}
      />
    </Page>
  );
}

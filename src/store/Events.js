import { createContext, useState } from "react";

export const EventContext = createContext({
  eventList: [],
  loadEvents: async () => {},
  addEvent: (id) => {},
  removeEvent: (id) => {},
});

function EventContextProvider({ children }) {
  const [eventList, setEventList] = useState([]);

  function addEvent(id) {
    setEventList((currIds) => [...currIds, id]);
  }

  function removeEvent(id) {
    setEventList((currIds) => currIds.filter((eventId) => eventId !== id));
  }

  async function loadEvents() {
    const token = sessionStorage.getItem("token");

    const response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setEventList(data);
  }
  const value = {
    eventList: eventList,
    addEvent: addEvent,
    removeEvent: removeEvent,
    loadEvents,
  };
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}

export default EventContextProvider;

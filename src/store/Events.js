import { createContext, useState } from "react";

export const EventContext = createContext({
  eventList: [],
  userEventList: [],
  loadEvents: async () => {},
  loadUserEvents: async (id) => {},
  addEvent: (id) => {},
  removeEvent: (id) => {},
});

function EventContextProvider({ children }) {
  const [eventList, setEventList] = useState([]);
  const [userEventList, setUserEventList] = useState([]);

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
  async function loadUserEvents(id) {
    const token = sessionStorage.getItem("token");

    const response = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/guestsList/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    const eventData = data?.map((item) => {
      return { ...item.event, guest: item.guest };
    });
    setUserEventList(eventData);
  }
  const value = {
    eventList: eventList,
    userEventList,
    addEvent: addEvent,
    removeEvent: removeEvent,
    loadEvents,
    loadUserEvents,
  };
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}

export default EventContextProvider;

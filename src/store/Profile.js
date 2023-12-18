import { createContext, useState } from "react";

export const ProfileContext = createContext({
  eventList: [],
  profile: {},
  loadProfile: async (id) => {},
  loadUserEvents: async (id) => {},
});

function ProfileContextProvider({ children }) {
  const [profile, setProfile] = useState();
  const [eventList, setEventList] = useState([]);

  const token = sessionStorage.getItem("token");

  async function loadProfile(id) {
    const response = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/guests/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setProfile(data);
  }

  async function loadUserEvents(id) {
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
    const eventData = data?.map((item) => item.event);
    setEventList(eventData);
  }

  const value = {
    eventList,
    profile,
    loadProfile,
    loadUserEvents,
  };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export default ProfileContextProvider;

import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Main } from "../../templates/Main/Main";
import { EventCard } from "../../components/EventCard/EventCard";
import { Agenda } from "../../components/Agenda/Agenda";
import { CreateEventCard } from "../../components/CreateEventCard/CreateEventCard";
import { EventContext } from "../../store/Events";
import { getMyUser } from "../../hooks/UseMyUser";
import { findEventWithMostGuests, getEventsInfo } from "../../utils/utils";

function Home() {
  let location = useLocation();
  const user = getMyUser();

  const token = sessionStorage.getItem("token");

  const { loadEvents, loadUserEvents, userEventList, eventList } =
    useContext(EventContext);
  const refreshEvents = () => {
    loadUserEvents(user?.id);
    loadEvents();
  };
  useEffect(() => {
    if (user?.id) {
      refreshEvents();
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return (
    <Main page="home">
      <div className="flex w-full gap-6">
        <div className="flex flex-col gap-6 w-full">
          <CreateEventCard onClose={refreshEvents} />
          <div className="w-full h-full justify-between flex gap-6 ">
            <EventCard
              type="upcoming"
              event={getEventsInfo(userEventList)?.nextEvent}
            />
            <EventCard
              type="trending"
              event={findEventWithMostGuests(eventList)}
            />
          </div>
          <div className="w-full h-full justify-between flex gap-6">
            <EventCard
              type="latest"
              event={getEventsInfo(userEventList)?.lastCompletedEvent}
            />
            <EventCard
              type="new"
              event={getEventsInfo(userEventList)?.latestCreatedEvent}
            />
          </div>
        </div>

        <div className="w-full">
          <Agenda myEvents={userEventList || []} />
        </div>
      </div>
    </Main>
  );
}

export default Home;

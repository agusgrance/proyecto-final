import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Main } from "../../templates/Main/Main";
import { EventCard } from "../../components/EventCard/EventCard";
import { Agenda } from "../../components/Agenda/Agenda";
import { CreateEventCard } from "../../components/CreateEventCard/CreateEventCard";
import { EventContext } from "../../store/Events";

function Home() {
  let location = useLocation();

  const token = sessionStorage.getItem("token");

  const { loadEvents, eventList } = useContext(EventContext);

  useEffect(() => {
    loadEvents();
  }, [token]);

  if (!token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return (
    <Main page="home">
      <div className="flex w-full gap-6">
        <div className="flex flex-col gap-6 w-full">
          <CreateEventCard />
          <div className="w-full h-full justify-between flex gap-6 ">
            <EventCard type="upcoming" />
            <EventCard type="trending" />
          </div>
          <div className="w-full h-full justify-between flex gap-6">
            <EventCard type="latest" />
            <EventCard type="new" />
          </div>
        </div>

        <div className="w-full">
          <Agenda myEvents={eventList} />
        </div>
      </div>
    </Main>
  );
}

export default Home;

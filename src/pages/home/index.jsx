import React, { useContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Main } from "../../templates/Main/Main";
import { EventCard } from "../../components/EventCard/EventCard";
import { Agenda } from "../../components/Agenda/Agenda";
import { CreateEventCard } from "../../components/CreateEventCard/CreateEventCard";
import { EventContext } from "../../store/Events";
import { getMyUser } from "../../hooks/UseMyUser";
import { findEventWithMostGuests, getEventsInfo } from "../../utils/utils";
import Event from "../../components/Event/Event";
import clsx from "clsx";

function Home() {
  let location = useLocation();
  const navigate = useNavigate();

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

  const getNotAcceptedEvents = (eventDataList) => {
    return eventDataList?.filter((eventItem) =>
      eventItem?.guestLists.find(
        (guest) => guest?.guestId === user?.id && !guest?.accepted
      )
    );
  };
  const getAcceptedEvents = (eventDataList) => {
    return eventDataList?.filter((eventItem) =>
      eventItem?.guestLists.find(
        (guest) => guest?.guestId === user?.id && guest?.accepted
      )
    );
  };
  console.log("test", userEventList);
  return (
    <Main page="home">
      <div className="flex flex-col w-full">
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
        <div
          className={clsx("flex flex-col w-full mt-12", {
            ["hidden"]: !getAcceptedEvents(eventList)?.length,
          })}
        >
          <h3 className="text text-[23px] font-bold mb-6">Eventos Aceptados</h3>
          <div className="grid grid-cols-4 gap-4">
            {getAcceptedEvents(eventList)
              ?.filter((event) => event?.title)
              ?.map((event) => {
                return (
                  <div
                    onClick={() => navigate(`/event/${event.id}`)}
                    className="cursor-pointer hover:opacity-70"
                  >
                    <Event
                      {...event}
                      classname={"min-h-fit"}
                      imageClassname={"max-h-[200px]"}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div
          className={clsx("flex flex-col w-full mt-12", {
            ["hidden"]: !getNotAcceptedEvents(eventList)?.length,
          })}
        >
          <h3 className="text text-[23px] font-bold mb-6">
            Eventos Sin Aceptar
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {getNotAcceptedEvents(eventList)
              ?.filter((event) => event?.title)
              ?.map((event) => {
                return (
                  <div
                    onClick={() => navigate(`/event/${event.id}`)}
                    className="cursor-pointer hover:opacity-70"
                  >
                    <Event
                      {...event}
                      classname={"min-h-fit"}
                      imageClassname={"max-h-[200px]"}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div
          className={clsx("flex flex-col w-full mt-12", {
            ["hidden"]: !eventList.length,
          })}
        >
          <h3 className="text text-[23px] font-bold mb-6">Todos Los Eventos</h3>
          <div className="grid grid-cols-4 gap-4">
            {eventList
              ?.filter((event) => event?.title)
              ?.map((event) => {
                return (
                  <div
                    onClick={() => navigate(`/event/${event.id}`)}
                    className="cursor-pointer hover:opacity-70"
                  >
                    <Event
                      {...event}
                      classname={"min-h-fit h-[450px]"}
                      imageClassname={"max-h-[200px]"}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Home;

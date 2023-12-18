import React, { useContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Calendar as CalendarComponent } from "../../components/Calendar/Calendar";

import { Main } from "../../templates/Main/Main";
import { SpeedDialTooltipOpen } from "../../components/SpeedDial/SpeedDial";
import { EventContext } from "../../store/Events";
import { getMyUser } from "../../hooks/UseMyUser";
import Event from "../../components/Event/Event";
import clsx from "clsx";

function Calendar() {
  const token = sessionStorage.getItem("token");
  const user = getMyUser();

  let location = useLocation();
  const navigate = useNavigate();

  const { loadUserEvents, userEventList } = useContext(EventContext);

  const refreshEvents = () => {
    loadUserEvents(user?.id);
  };
  useEffect(() => {
    if (user?.id) {
      refreshEvents();
    }
  }, [token]);
  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  return (
    <Main page={"calendar"}>
      <CalendarComponent />
      <div
        className={clsx("flex flex-col w-full mt-12", {
          ["hidden"]: !userEventList.length,
        })}
      >
        <h3 className="text text-[23px] font-bold mb-6">Tus Eventos</h3>
        <div className="grid grid-cols-4 gap-4">
          {userEventList
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
    </Main>
  );
}

export default Calendar;

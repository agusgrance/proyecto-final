import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Calendar as CalendarComponent } from "../../components/Calendar/Calendar";

import { Main } from "../../templates/Main/Main";
import { SpeedDialTooltipOpen } from "../../components/SpeedDial/SpeedDial";

function Calendar() {
  let location = useLocation();

  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  return (
    <Main page={"calendar"}>
      <CalendarComponent />
    </Main>
  );
}

export default Calendar;

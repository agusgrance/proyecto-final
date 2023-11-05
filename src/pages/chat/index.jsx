import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Calendar } from "../../components/Calendar/Calendar";

import { Main } from "../../templates/Main/Main";

function Chat() {
  let location = useLocation();

  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  return <Main page={"chat"}>Chat</Main>;
}

export default Chat;

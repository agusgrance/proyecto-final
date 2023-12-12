import { Routes, Route } from "react-router-dom";

import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Home from "./pages/home";
import Calendar from "./pages/calendar";
import MyProfile from "./pages/my-profile";
import Chat from "./pages/chat";
import EventID from "./pages/Event/[id]";

function RouteList() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/event/:id" element={<EventID />} />
    </Routes>
  );
}

export default RouteList;

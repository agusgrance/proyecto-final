import { Routes, Route } from "react-router-dom";

import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Home from "./pages/home";
import Calendar from "./pages/calendar";
import MyProfile from "./pages/my-profile";
import Chat from "./pages/chat";
import EventID from "./pages/Event/[id]";
import Admin from "./pages/Admin";
import Profile from "./pages/profile/[id]";

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
      <Route path="/profile/:id" element={<Profile />} />

      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default RouteList;

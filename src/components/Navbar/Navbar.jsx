import React from "react";
import dashboard from "../../icons/dashboard.png";
import chat from "../../icons/chat.png";
import signOut from "../../icons/signOut.png";
import calendar from "../../icons/calendar.png";
import home from "../../icons/home.png";
import user from "../../icons/user.png";
import logo from "../../icons/logo.png";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    sessionStorage.clear();
    return navigate("/sign-in");
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-6 ">
      <div className="h-[80%] flex flex-col justify-between items-center ">
        <Link to="/" className="bg-[#f5efd7] rounded-lg p-1 cursor-pointer">
          <img src={logo} alt="" />
        </Link>

        <Link to="/">
          <img className="h-8" src={home} alt="" />
        </Link>

        <Link to="/calendar">
          <img className="h-8" src={calendar} alt="" />
        </Link>
        <Link to="/chat">
          <img className="h-8" src={chat} alt="" />
        </Link>
        <Link to="/my-profile">
          <img className="h-8" src={user} alt="" />
        </Link>
      </div>
      <div>
        <button onClick={handleSignOut}>
          <img className="h-8" src={signOut} alt="" />
        </button>
      </div>
    </div>
  );
}

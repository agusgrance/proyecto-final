import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
const GoogleCalendarButton = ({ title, description, start, end, location }) => {
  const handleClick = () => {
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(
      location
    )}&dates=${encodeURIComponent(start)}/${encodeURIComponent(end)}`;

    window.open(googleCalendarUrl);
  };

  return (
    <button
      className="flex  items-center text-center bg-yellow-500 p-2 rounded-lg text-white hover:opacity-90 "
      onClick={handleClick}
    >
      <div className="w-full">
        <OpenInNewIcon />
        Añadir a Google Calendar
      </div>
    </button>
  );
};

export default GoogleCalendarButton;

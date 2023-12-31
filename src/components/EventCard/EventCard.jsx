import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";

const eventType = {
  upcoming: "Proximo Evento",
  new: "Nuevos Participantes",
  latest: "Tu ultimo Evento",
  trending: "Evento Popular",
};
const eventTypeClassName = {
  upcoming: "bg-upcoming-gradient",
  new: "bg-new-gradient",
  latest: "bg-latest-gradient",
  trending: "bg-trending-gradient",
};
export function EventCard({ type, event }) {
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        "flex  flex-col justify-between w-full h-full rounded-xl text-white p-6 shadow-2xl	cursor-pointer hover:opacity-90",
        eventTypeClassName?.[type]
      )}
      onClick={() => event?.id && navigate(`/event/${event.id}`)}
    >
      <div>
        <h4 className="text-[13px] font-normal m-0 text-[#ffffffb3]">
          {eventType?.[type]}
        </h4>
        <h5 className="text-[25px] font-bold m-0">
          {event?.title || "No Events yet"}
        </h5>
      </div>
      {event?.id && (
        <div className="flex justify-end">
          <h6 className="text-[16px] font-normal m-0">
            Click to see more details.
          </h6>
        </div>
      )}
    </div>
  );
}

import clsx from "clsx";
import React from "react";
const eventType = {
  upcoming: "Proximo Evento",
  new: "Nuevo Evento",
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
  return (
    <div
      className={clsx(
        "flex  flex-col  justify-between w-full h-full rounded-xl text-white p-6 shadow-2xl	",
        eventTypeClassName?.[type]
      )}
    >
      <div>
        <h4 className="text-[13px] font-normal m-0 text-[#ffffffb3]">
          {eventType?.[type]}
        </h4>
        <h5 className="text-[25px] font-bold m-0">{event?.title || "test"}</h5>
      </div>
      <div className="flex justify-end">
        <h6 className="text-[16px] font-normal m-0">hosted by username</h6>
      </div>
    </div>
  );
}

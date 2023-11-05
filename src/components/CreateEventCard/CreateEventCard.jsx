import clsx from "clsx";
import React from "react";

export function CreateEventCard({ type, event }) {
  return (
    <div
      className={clsx(
        "flex  flex-col  justify-between w-full h-full rounded-xl  p-6 shadow-2xl	bg-white"
      )}
    >
      <h5 className="text-[25px] font-bold m-0">Create Event </h5>
    </div>
  );
}

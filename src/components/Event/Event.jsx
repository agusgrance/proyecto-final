import React, { useState } from "react";
import { formatDate } from "../../utils/utils";
import Button from "@mui/material/Button";
import Modal from "../Modal/Modal";
import { CreateEventCard } from "../CreateEventCard/CreateEventCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import clsx from "clsx";

export default function Event({
  id,
  title,
  description,
  color,
  start,
  end,
  image,
  location,
  isHost,
  isInvited,
  guestLists,
  isAccepted,
  onJoin,
  onUpdate,
  onClose,
  classname,
  imageClassname,
}) {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const guests = guestLists?.map((guest) => guest.guestId);
  const handleClose = () => {
    setIsEditVisible(false);
    onClose?.();
  };
  return (
    <>
      <div
        className={clsx(
          "flex flex-col rounded-xl shadow-xl w-full min-h-[500px] h-fit",
          classname
        )}
      >
        <img
          className={clsx(
            "w-full h-[70%] object-cover rounded-t-xl",
            imageClassname
          )}
          src={image || ""}
        />
        <div className="flex flex-col px-4 py-6 justify-between gap-4 h-[30%]">
          <h3 className="text-[23px] font-bold">{title}</h3>

          <p className="text-[16px] text-gray-700">
            {description || "No Description."}
          </p>
          <p className="text-[16px] text-gray-700">
            <LocationOnIcon /> {location || "No Location."}
          </p>
          <div className="flex justify-start gap-4">
            <h5 className="text-[16px] text-gray-700">
              <DateRangeIcon /> {formatDate(new Date(start))}
            </h5>
            <h5 className="text-[16px] text-gray-700">-</h5>
            <h5 className="text-[16px] text-gray-700">
              <DateRangeIcon />
              {formatDate(new Date(end))}
            </h5>
          </div>
          <div
            className={clsx("flex justify-around", {
              ["hidden"]: !onJoin || !onUpdate,
            })}
          >
            {!isInvited ? (
              <Button
                variant="contained"
                color="info"
                type="Button"
                onClick={onJoin}
              >
                Unirse
              </Button>
            ) : (
              <>
                {isAccepted ? (
                  <Button
                    variant="contained"
                    color="error"
                    type="Button"
                    onClick={() => onUpdate(false)}
                  >
                    Rechazar
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    type="Button"
                    onClick={() => onUpdate(true)}
                  >
                    Aceptar
                  </Button>
                )}
              </>
            )}
          </div>
          {isHost && (
            <Button
              variant="contained"
              color="info"
              type="Button"
              onClick={() => setIsEditVisible(true)}
            >
              Editar
            </Button>
          )}
        </div>
      </div>
      <Modal
        visible={isEditVisible}
        handleClose={() => setIsEditVisible(false)}
      >
        <CreateEventCard
          isEdit={true}
          onClose={handleClose}
          defaultForm={{
            id,
            title,
            description,
            location,
            startDate: start,
            endDate: end,
            color,
            guests,
            image,
          }}
        />
      </Modal>
    </>
  );
}

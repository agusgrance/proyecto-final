import React, { useState } from "react";
import { formatDate } from "../../utils/utils";
import Button from "@mui/material/Button";
import Modal from "../Modal/Modal";
import { CreateEventCard } from "../CreateEventCard/CreateEventCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import clsx from "clsx";
import ConfirmModal from "../Modal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { removeEvent } from "../../api/Event/removeEvent";
import GoogleCalendarButton from "../GoogleCalendarButton/GoogleCalendarButton";

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
  onDeny,
  imageClassname,
}) {
  const navigate = useNavigate();

  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const guests = guestLists?.map((guest) => guest.guestId);
  const handleClose = () => {
    setIsEditVisible(false);
    onClose?.();
  };
  const handleRemoveModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleConfirmModal = async () => {
    handleCloseModal();
    await removeEvent(id);
    return navigate(`/`);
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
          <GoogleCalendarButton
            title={title}
            start={start}
            end={end}
            location={location}
            description={description}
          />
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
                    color="warning"
                    type="Button"
                    onClick={() => onUpdate(false)}
                  >
                    Cambiar a Pendiente
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
                <Button
                  variant="contained"
                  color="error"
                  type="Button"
                  onClick={() => onDeny?.()}
                >
                  Rechazar
                </Button>
              </>
            )}
          </div>
          {isHost && (
            <div className="flex justify-evenly w-full ">
              <Button
                variant="contained"
                color="info"
                type="Button"
                onClick={() => setIsEditVisible(true)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                type="Button"
                onClick={handleRemoveModal}
              >
                Eliminar
              </Button>
            </div>
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
      <ConfirmModal
        open={isOpen && id}
        content={
          id && `¿Estas seguro que deseas eliminar el item con el id: ${id}?`
        }
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
    </>
  );
}

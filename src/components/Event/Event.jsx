import React from "react";
import { formatDate } from "../../utils/utils";
import Button from "@mui/material/Button";

export default function Event({
  title,
  description,
  start,
  end,
  image,
  location,
  isHost,
  isInvited,
  isAccepted,
  onJoin,
  onUpdate,
}) {
  return (
    <div className="flex flex-col rounded-xl shadow-xl w-full min-h-[500px] h-fit">
      <img
        className="w-full h-[70%] object-cover rounded-t-xl"
        src={image || ""}
      />
      <div className="flex flex-col px-4 py-6 justify-between gap-4 h-[30%]">
        <h3 className="text-[23px] font-bold">{title}</h3>

        <p className="text-[16px] text-gray-700">
          {description || "No Description."}
        </p>
        <p className="text-[16px] text-gray-700">
          {location || "No Location."}
        </p>
        <div className="flex justify-around">
          <h5 className="text-[16px] text-gray-700">
            {formatDate(new Date(start))}
          </h5>
          <h5 className="text-[16px] text-gray-700">
            {formatDate(new Date(end))}
          </h5>
        </div>
        <div className="flex justify-around">
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
          <Button variant="contained" color="info" type="Button">
            Editar
          </Button>
        )}
      </div>
    </div>
  );
}

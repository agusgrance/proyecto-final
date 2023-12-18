import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card as CardMUI,
  CardContent,
  Typography,
} from "@mui/material";
import EditUserModal from "../Modal/EditUserModal";

const CardUser = ({ user, onRefresh }) => {
  const [isEditUser, setIsEditUser] = useState(false);

  const handleConfirmEdit = async () => {
    await onRefresh?.();
    setIsEditUser(false);
  };
  return (
    <>
      <CardMUI className="flex flex-col items-center text-center w-[400px]">
        <CardContent className="flex flex-col items-center w-full">
          <Avatar
            src={user?.avatar || ""}
            sx={{ width: "100px", height: "100px" }}
          />
          <Typography variant="h5">{user?.username}</Typography>
          <Typography variant="body2">{user?.email}</Typography>
        </CardContent>
        <CardContent className="flex flex-col justify-evenly gap-4 items-center w-full">
          {/*  <Button variant="outlined">Enviar Mensaje</Button> */}
          <Button
            variant="contained"
            onClick={() => setIsEditUser(!isEditUser)}
          >
            Editar
          </Button>
        </CardContent>
      </CardMUI>

      <EditUserModal
        open={isEditUser}
        onClose={() => setIsEditUser(false)}
        onConfirm={handleConfirmEdit}
        user={user}
      />
    </>
  );
};

export default CardUser;

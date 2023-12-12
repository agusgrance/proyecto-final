// src/ChatInput.js
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export const ChatInput = () => {
  const handleMessageSend = () => {
    // Aquí puedes implementar la lógica para enviar mensajes
    console.log("Mensaje enviado");
  };

  return (
    <div className="flex items-center">
      <TextField
        label="Escribe tu mensaje"
        variant="outlined"
        fullWidth
        size="small"
        // Agrega más propiedades según tus necesidades
      />
      <Button
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        onClick={handleMessageSend}
      >
        Enviar
      </Button>
    </div>
  );
};

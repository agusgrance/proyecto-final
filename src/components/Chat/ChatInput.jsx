import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export const ChatInput = () => {
  const handleMessageSend = () => {};

  return (
    <div className="flex items-center">
      <TextField
        label="Escribe tu mensaje"
        variant="outlined"
        fullWidth
        size="small"
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

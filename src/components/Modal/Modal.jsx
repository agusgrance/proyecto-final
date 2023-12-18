import React from "react";
import { Dialog } from "@mui/material";

export default function Modal({ children, visible, handleClose, classname }) {
  return (
    <Dialog open={visible} onClose={handleClose} className={classname}>
      {children}
    </Dialog>
  );
}

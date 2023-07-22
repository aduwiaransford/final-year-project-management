import React, { useState } from "react";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

const NotificationAlert = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationAlert;

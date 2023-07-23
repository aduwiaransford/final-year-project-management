import React, { useState } from "react";
import { IconButton, Popover, MenuItem, MenuList } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const UserProfilePopup = ({ username, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <AccountCircle />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList>
          <MenuItem onClick={handleClose}>{username}</MenuItem>
          <MenuItem onClick={handleLogout}>Change Password</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
};

export default UserProfilePopup;

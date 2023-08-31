import React, { useState, useContext } from "react";
import axios from "axios";
import {
  IconButton,
  Popover,
  MenuItem,
  MenuList,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../context/authContext/AuthContext";
import NotificationAlert from "./NotificationAlert";

const UserProfilePopup = ({ username, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false); // State for the change password dialog
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const { user } = useContext(AuthContext);
  const accessToken = user.data.accessToken;

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

  const handleOpenChangePassword = () => {
    setChangePasswordOpen(true);
    handleClose();
  };

  const handleCloseChangePassword = () => {
    setChangePasswordOpen(false);
  };

  const open = Boolean(anchorEl);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      console.error("New password and confirm password do not match");
      setNotificationMessage("New password and confirm password do not match");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    try {
      const res = await axios.post(
        "/users/changepassword",
        {
          userId: user.data.id,
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res.data);
      handleCloseChangePassword();

      setNotificationMessage(res.data.message); // Use the actual response message
      setNotificationSeverity("success");
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error changing password:", error.response.data);

      setNotificationMessage(error.response.data.message); // Use the actual error message
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

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
          <MenuItem onClick={handleOpenChangePassword}>
            Change Password
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Popover>
      {/* Change Password Dialog */}
      <Dialog open={changePasswordOpen} onClose={handleCloseChangePassword}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            margin="dense"
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="dense"
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangePassword} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleChangePassword} color="secondary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
      <NotificationAlert
        open={notificationOpen}
        message={notificationMessage}
        severity={notificationSeverity}
        onClose={handleNotificationClose}
      />
    </div>
  );
};

export default UserProfilePopup;

import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import UserProfilePopup from "../../components/Popup"; // Import the UserProfilePopup component
import { AuthContext } from "../../context/authContext/AuthContext";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const { user } = useContext(AuthContext);
  const username = user?.data.firstname + " " + user?.data.lastname;

  const handleLogout = () => {
    localStorage.removeItem("user");
    console.log("Logging out...");
    window.location.href = "/";
  };

  return (
    <Box display="flex" justifyContent="end" p={2}>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        {/* Use the UserProfilePopup component here */}
        <UserProfilePopup username={username} onLogout={handleLogout} />
      </Box>
    </Box>
  );
};

export default Topbar;

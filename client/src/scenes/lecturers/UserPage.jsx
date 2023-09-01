import { useContext } from "react";
import { Box, useTheme, Typography } from "@mui/material";

import { tokens } from "../../theme";
import Header from "../../components/Header";
import { AuthContext } from "../../context/authContext/AuthContext";

const UserPage = () => {
  const theme = useTheme();

  const { user } = useContext(AuthContext);

  return (
    <Box m="20px">
      <Header title="User Page" subtitle="User Details" />
      {user ? (
        <Box>
          <Typography variant="h3">
            Name: {user.data.firstname} {user.data.lastname}
          </Typography>
          <Typography variant="h3">Email: {user.data.email}</Typography>
          <Typography variant="h3">Contact: {user.data.contact}</Typography>
          <Typography variant="h3">
            Department: {user.data.department}
          </Typography>
        </Box>
      ) : (
        <p>User not found</p>
      )}
    </Box>
  );
};

export default UserPage;

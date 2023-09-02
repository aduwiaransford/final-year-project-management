import React from "react";

import Topbar from "../global/Topbar";
import AdminSidebar from "../global/AdminSidebar";
import NormalSidebar from "../global/NormalSidebar";
import { useState, useContext } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";

const Layout = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const { user } = useContext(AuthContext);

  // if (!user) {
  //   return <Navigate to="/" />;
  // }

  if (user.data.isAdmin) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <AdminSidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Outlet />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  // If the user is a normal user, render the normal user dashboard
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <NormalSidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Outlet />
          </main>
          {/* Render the normal user dashboard */}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Layout;

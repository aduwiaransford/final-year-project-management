import React from "react";

import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState, useContext } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";

const Layout = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const { user } = useContext(AuthContext);

  return user ? (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  ) : (
    <Navigate to="/" />
  );
};

export default Layout;

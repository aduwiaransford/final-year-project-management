import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { StudentProvider } from "./context/studentApi/StudentContext";
import { LecturerProvider } from "./context/lecturerApi/LecturerApi";
import { ProjectProvider } from "./context/projectApi/ProjectContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <StudentProvider>
          <LecturerProvider>
            <ProjectProvider>
              <App />
            </ProjectProvider>
          </LecturerProvider>
        </StudentProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

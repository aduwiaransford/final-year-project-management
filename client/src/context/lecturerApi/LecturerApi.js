// LecturerContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const LecturerContext = createContext();

export const LecturerProvider = ({ children }) => {
    const [lecturers, setLecturers] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const fetchLecturers = async () => {
        try {
            const res = await axios.get("/users");
            const lecturersWithId = res.data.map((lecture) => ({
                ...lecture,
                id: lecture._id, // Add the id property using the _id field from the backend
            }));
            setLecturers(lecturersWithId);
        } catch (error) {
            console.error("Error fetching lecturer data:", error.response.data);
            // Handle errors here (e.g., show error message to the user)
        }
    };


    return (
        <LecturerContext.Provider
            value={{
                lecturers,
                fetchLecturers
            }}
        >
            {children}
        </LecturerContext.Provider>
    );
};

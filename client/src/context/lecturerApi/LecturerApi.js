// LecturerContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const LecturerContext = createContext();

export const LecturerProvider = ({ children }) => {
    const [lecturers, setLecturers] = useState([]);

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

    //delete lecturers
    const deleteMultipleLecturers = async (lecIDs) => {
        try {
            const response = await axios.delete('/users', {
                data: { ids: lecIDs },
            });

            // You can return the response to the component if needed
            return response.data;
        } catch (error) {
            // Handle errors here (e.g., show an error message)
            throw error;
        }
    };

    return (
        <LecturerContext.Provider
            value={{
                lecturers,
                fetchLecturers,
                deleteMultipleLecturers,
            }}
        >
            {children}
        </LecturerContext.Provider>
    );
};

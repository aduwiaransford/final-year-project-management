// StudentContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const fetchStudents = async () => {
        try {
            const res = await axios.get("/students");
            const studentsWithId = res.data.map((student) => ({
                ...student,
                id: student._id,
            }));
            setStudents(studentsWithId);
        } catch (error) {
            console.error("Error fetching student data:", error.response.data);
            // Handle errors here (e.g., show error message to the user)
        }
    };

    const addStudent = async (formData) => {
        try {
            const res = await axios.post("/students", formData, {
                headers: {
                    // Include any headers you need for authentication (if applicable)
                },
            });
            setShowSuccessAlert(true);
            console.log(res.data); // The response from the server (e.g., success message)
            fetchStudents(); // Fetch updated students after successful addition

            // Reset the form fields after successful submission

        } catch (error) {
            // Handle errors here (e.g., show error message to the user)
            setShowErrorAlert(true);
            console.error("Error creating user:", error);
        }
    };

    const handleCloseAlert = () => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
    };

    // File upload function
    const uploadFile = async (file) => {
        if (!file) {
            alert("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("/students/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // Handle success response here (e.g., show success message)
            setShowSuccessAlert(true);
        } catch (error) {
            // Handle error response here (e.g., show error message)
            setShowErrorAlert(true);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // fetch students without supervisor
    const [studentsWithout, setStudentsWithout] = useState([]);

    const fetchStudentsWithout = async () => {
        try {
            const res = await axios.get("/students/without-supervisor");
            const studentsWithId = res.data.map((student) => ({
                ...student,
                id: student._id, // Add the id property using the _id field from the backend
            }));
            setStudentsWithout(studentsWithId);
        } catch (error) {
            console.error("Error fetching student data:", error.response.data);
            // Handle errors here (e.g., show error message to the user)
        }
    };

    // Delete multiple students
    const deleteMultipleStudents = async (studentIds) => {
        try {
            const response = await axios.delete('/students', {
                data: { ids: studentIds },
            });

            // You can return the response to the component if needed
            return response.data;
        } catch (error) {
            // Handle errors here (e.g., show an error message)
            throw error;
        }
    };

    return (
        <StudentContext.Provider
            value={{
                students,
                fetchStudents,
                addStudent,
                uploadFile,
                showSuccessAlert,
                showErrorAlert,
                setShowErrorAlert,
                setShowSuccessAlert,
                handleCloseAlert,
                studentsWithout,
                fetchStudentsWithout,
                deleteMultipleStudents
            }}
        >
            {children}
        </StudentContext.Provider>
    );
};

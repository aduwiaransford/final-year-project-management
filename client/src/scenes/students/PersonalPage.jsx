import { useEffect, useState, useContext } from "react";
import { Box, useTheme } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { StudentContext } from "../../context/studentApi/StudentContext";
import { AuthContext } from "../../context/authContext/AuthContext";

const PersonalPage = () => {
  const { students } = useContext(StudentContext);
  const { id } = useParams(); // Extract the student ID from the URL

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Find the student data corresponding to the extracted ID
  const student = students.find((student) => student._id === id);

  return (
    <Box>
      <Header title="Personal Page" subtitle="Student Details" />
      {student ? (
        <Box m="20px">
          <p>
            Name: {student.firstname} {student.lastname}
          </p>
          <p>Index: {student.index}</p>
          <p>Contact: {student.contact}</p>
          <p>Department: {student.department}</p>
        </Box>
      ) : (
        <p>Student not found</p>
      )}
    </Box>
  );
};

export default PersonalPage;

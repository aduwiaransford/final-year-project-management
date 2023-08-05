import { useEffect, useState, useContext } from "react";
import {
  Box,
  useTheme,
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { StudentContext } from "../../context/studentApi/StudentContext";
import { ProjectContext } from "../../context/projectApi/ProjectContext";

const PersonalPage = () => {
  const { students } = useContext(StudentContext);
  const { id } = useParams(); // Extract the student ID from the URL

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Find the student data corresponding to the extracted ID
  const student = students.find((student) => student._id === id);

  // State to manage the current chapter and remarks
  const [currentChapter, setCurrentChapter] = useState("chapter1");
  const [remarks, setRemarks] = useState({
    chapter1: "",
    chapter2: "",
    chapter3: "",
    chapter4: "",
    chapter5: "",
  });

  // Access the Project
  const { addChapter, updateChapter } = useContext(ProjectContext);

  // Update the remark for the current chapter
  const handleRemarkChange = (value) => {
    setRemarks((prevRemarks) => ({ ...prevRemarks, [currentChapter]: value }));
  };

  // Generate the summary report based on the remarks
  const generateSummaryReport = () => {
    // Create the summary report based on the remarks
    const summaryReport = `
      Summary Report for ${student.firstname} ${student.lastname}
      Chapter 1: ${remarks.chapter1}
      Chapter 2: ${remarks.chapter2}
      Chapter 3: ${remarks.chapter3}
      Chapter 4: ${remarks.chapter4}
      Chapter 5: ${remarks.chapter5}
    `;

    // Display the summary report in an alert (you can customize how you want to display it)
    alert(summaryReport);
  };

  // Function to save the remarks for the current chapter to the context
  const saveRemarks = () => {
    const chapterData = {
      id: currentChapter,
      remarks: remarks[currentChapter],
    };

    updateChapter(currentChapter, chapterData);
  };

  return (
    <Box m="0 20px">
      <Header title="Student Page" subtitle="Student Details" />
      {student ? (
        <Box>
          <Box mb={2} display="flex" justifyContent="space-between">
            <Box>
              <p>
                Name: {student.firstname} {student.lastname}
              </p>
              <p>Index: {student.index}</p>
              <p>Contact: {student.contact}</p>
              <p>Department: {student.department}</p>
            </Box>
            <Box mr="50px">
              <p>Project Topic:</p>
              <p>Project Category:</p>
            </Box>
          </Box>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Select
              value={currentChapter}
              onChange={(e) => setCurrentChapter(e.target.value)}
            >
              <MenuItem value="chapter1">Chapter 1</MenuItem>
              <MenuItem value="chapter2">Chapter 2</MenuItem>
              <MenuItem value="chapter3">Chapter 3</MenuItem>
              <MenuItem value="chapter4">Chapter 4</MenuItem>
              <MenuItem value="chapter5">Chapter 5</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label={`Remarks - ${currentChapter}`}
            multiline
            rows={8}
            value={remarks[currentChapter]}
            onChange={(e) => handleRemarkChange(e.target.value)}
            variant="filled"
            sx={{ width: "100%", mb: 2 }}
          />
          <Box display="flex" justifyContent="end">
            <Box m="0 10px 0 0">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={generateSummaryReport}
              >
                Summary
              </Button>
            </Box>
            <Box>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={saveRemarks}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <p>Student not found</p>
      )}
    </Box>
  );
};

export default PersonalPage;

import { useEffect, useState, useContext } from "react";
import {
  Box,
  useTheme,
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
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

  // Access the ProjectContext
  const {
    createOrUpdateChapter,
    fetchChaptersByStudentId,
    chapters,
    fetchSummaryReport,
    summaryReport,
  } = useContext(ProjectContext);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [remarks, setRemarks] = useState("");
  // Find the student data corresponding to the extracted ID
  const student = students.find((student) => student._id === id);

  //save remarks
  const saveRemarks = () => {
    // Validate if a student and chapter are selected
    if (!selectedChapter) {
      alert("Please select a student and a chapter");
      return;
    }

    // Submit the remarks to the backend
    const chapterData = {
      id: id,
      remarks: { ...remarks, [selectedChapter]: remarks[selectedChapter] },
      chapters: Object.keys(remarks), // Pass the chapter numbers as an array to the backend
    };

    createOrUpdateChapter(chapterData);
    console.log(chapterData);

    // ... (Add logic to handle API response or redirect to a different page)
  };

  //fetch chapters remarks
  useEffect(() => {
    if (student) {
      fetchSummaryReport(id);
    }
  }, [student, id]);

  // Function to display the summary report
  const generateSummaryReport = () => {
    // Check if the summary report is available
    if (summaryReport) {
      // Sort the summaryReport array by chapter numbers
      const sortedSummaryReport = summaryReport.sort((a, b) => {
        const chapterNumberA = parseInt(
          a.chapterNumbers[0].replace("chapter", "")
        );
        const chapterNumberB = parseInt(
          b.chapterNumbers[0].replace("chapter", "")
        );
        return chapterNumberA - chapterNumberB;
      });

      // Map over the sortedSummaryReport array to create JSX elements for each chapter
      const summaryItems = sortedSummaryReport.map((item) => (
        <div key={item._id}>
          <h3>Chapter {item.chapterNumbers[0]}</h3>
          <p>{item.remarks}</p>
        </div>
      ));

      // Display the summary report on the UI
      return <div>{summaryItems}</div>;
    } else {
      // If summaryReport is not available yet, show a message
      return <p>Summary report is not available yet.</p>;
    }
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
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              displayEmpty // This will display an empty option as a placeholder
            >
              <MenuItem value="" disabled>
                Select a chapter
              </MenuItem>
              <MenuItem value="chapter1">Chapter 1</MenuItem>
              <MenuItem value="chapter2">Chapter 2</MenuItem>
              <MenuItem value="chapter3">Chapter 3</MenuItem>
              <MenuItem value="chapter4">Chapter 4</MenuItem>
              <MenuItem value="chapter5">Chapter 5</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label={`Remarks - ${selectedChapter}`}
            multiline
            rows={8}
            value={remarks[selectedChapter] || ""} // Use the selected chapter's remarks or an empty string
            onChange={(e) =>
              setRemarks({ ...remarks, [selectedChapter]: e.target.value })
            } // Update the specific chapter's remarks
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
                disabled={!selectedChapter}
              >
                Submit
              </Button>
            </Box>
          </Box>
          {generateSummaryReport()}
        </Box>
      ) : (
        <p>Student not found</p>
      )}
    </Box>
  );
};

export default PersonalPage;

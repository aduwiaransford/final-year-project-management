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
import SummaryDialog from "../../components/SummaryDialog";
import { StudentContext } from "../../context/studentApi/StudentContext";
import { ProjectContext } from "../../context/projectApi/ProjectContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import axios from "axios";

const PersonalPage = () => {
  const { students, fetchStudents } = useContext(StudentContext);
  const { id } = useParams(); // Extract the student ID from the URL

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useContext(AuthContext);

  //fetch student
  useEffect(() => {
    fetchStudents();
  }, []);

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
  const saveRemarks = async () => {
    // Validate if a student and chapter are selected
    if (!selectedChapter) {
      alert("Please select a chapter");
      return;
    }

    // Submit the remarks to the backend
    const chapterData = {
      id: id,
      remarks: { ...remarks, [selectedChapter]: remarks[selectedChapter] },
      chapters: Object.keys(remarks), // Pass the chapter numbers as an array to the backend
    };

    await createOrUpdateChapter(chapterData);
    console.log(chapterData);

    // Reload the page
    window.location.reload();
  };

  //fetch chapters remarks
  useEffect(() => {
    if (student) {
      fetchSummaryReport(id);
    }
  }, [student, id]);

  const [summaryOpen, setSummaryOpen] = useState(false);
  const [summaryText, setSummaryText] = useState("");

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
      setSummaryText(summaryItems);
      setSummaryOpen(true);
    } else {
      // If summaryReport is not available yet, show a message
      setSummaryText("Summary report is not available yet.");
      setSummaryOpen(true);
    }
  };
  // send email
  const sendMail = async () => {
    try {
      // Fetch the supervisor's name based on the logged-in user's ID

      // Convert the summaryReport array into a formatted string
      const formattedSummary = summaryReport
        .map((item) => {
          return `Chapter ${item.chapterNumbers[0]}:\n${item.remarks}\n\n`;
        })
        .join("\n");

      // Create the email content with supervisor's name
      const emailContent = `Dear ${student.firstname},\n\nHere is the project report summary from your supervisor ${user.data.firstname}:\n\n${formattedSummary}`;

      const res = await axios.post("/students/send-mail", {
        studentId: id,
        subject: "Project Report",
        chapterSummary: emailContent, // Pass the formatted email content
      });

      console.log("email successfully sent", res);
    } catch (err) {
      console.log("error sending email", err);
    }
    setSummaryOpen(false);
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
              <p>Project Topic: {student.projectTitle}</p>
              <p>Project Category: {student.projectCategory}</p>
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
                disabled={!selectedChapter || !remarks[selectedChapter]}
              >
                Submit
              </Button>
            </Box>
          </Box>
          <SummaryDialog
            open={summaryOpen}
            handleClose={() => setSummaryOpen(false)}
            sendEmail={sendMail}
          >
            {summaryText}
          </SummaryDialog>
        </Box>
      ) : (
        <p>Student not found</p>
      )}
    </Box>
  );
};

export default PersonalPage;

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  useTheme,
  Autocomplete,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import NotificationAlert from "../../components/NotificationAlert";

const Assign = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "index", headerName: "Index" },
    {
      field: "firstname",
      headerName: "Firstname",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastname",
      headerName: "Lastname",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
  ];

  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/students/without-supervisor");
      const studentsWithId = res.data.map((student) => ({
        ...student,
        id: student._id, // Add the id property using the _id field from the backend
      }));
      setStudents(studentsWithId);
    } catch (error) {
      console.error("Error fetching student data:", error.response.data);
      // Handle errors here (e.g., show error message to the user)
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  //AutoComplete lecturer names
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const [selectedLecturerId, setSelectedLecturerId] = useState(null); // State to hold the selected lecturer ID
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
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

    fetchLecturers();
  }, []);

  const handleLecturerChange = (event, value) => {
    // When a lecturer is selected, log the lecturer ID
    if (value) {
      console.log("Selected Lecturer ID:", value.id);
      setSelectedLecturerId(value.id);
    }
  };

  // Assign students to supervisor
  const [selectedStudentId, setSelectedStudentId] = useState();

  const handleAssignStudent = async () => {
    if (!selectedLecturerId) {
      alert("Please select a lecturer to assign.");
      return;
    }

    try {
      // Make the API call to assign the student to the lecturer
      const res = await axios.post(`/users/assign`, {
        studentId: selectedStudentId,
        supervisorId: selectedLecturerId,
      });

      // Handle the success response here (e.g., show success message)
      setShowSuccessAlert(res.data);
      console.log("Student assigned successfully:", res.data);

      // Fetch the updated list of students without supervisors again
      fetchStudents();

      // Optionally, you can also clear the selected student and lecturer after a successful assignment
      setSelectedStudentId(null);
      setSelectedLecturerId(null);

      // Optionally, you can refresh the student list or update the student's supervisor field in the state.
      // You can do that by making another API call to get the updated student data or update the state directly.
    } catch (error) {
      // Handle the error response here (e.g., show error message)
      setShowErrorAlert(error.response.data.message);
      console.error("Error assigning student:", error.response.data);
    }
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(null); // Clear the success message when the alert is closed
    setShowErrorAlert(null); // Clear the error message when the alert is closed
  };

  return (
    <Box m="20px">
      <Header
        title="STUDENTS"
        subtitle="List of students without supervisors"
      />
      <Box display="flex" justifyContent="flex-end">
        <Autocomplete
          id="asynchronous-demo"
          sx={{ width: 300 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.firstname + " " + option.lastname} // Return the lecturer's full name
          options={lecturers} // Use the lecturers state for options
          loading={loading}
          onChange={handleLecturerChange} // Handle lecturer selection change
          renderInput={(params) => (
            <TextField
              variant="filled"
              {...params}
              label="Select Supervisor"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <Box m="20px" />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleAssignStudent}
        >
          Assign Student
        </Button>
        {/* Success Alert */}
        <NotificationAlert
          open={showSuccessAlert !== null}
          message={showSuccessAlert}
          severity="success"
          onClose={handleCloseAlert}
        />

        {/* Error Alert */}
        <NotificationAlert
          open={showErrorAlert !== null}
          message={showErrorAlert}
          severity="error"
          onClose={handleCloseAlert}
        />
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={students}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = students.find((row) =>
              selectedIDs.has(row.id.toString())
            );
            setSelectedStudentId(selectedRowData ? selectedRowData.id : null);
          }}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Assign;

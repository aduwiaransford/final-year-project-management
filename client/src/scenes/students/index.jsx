import { useState, useContext, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { StudentContext } from "../../context/studentApi/StudentContext";
import NotificationAlert from "../../components/NotificationAlert";

const Students = () => {
  const { students, fetchStudents, deleteMultipleStudents } =
    useContext(StudentContext);
  //const [selectedStudentId, setSelectedStudentId] = useState();

  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(null);
  console.log(selectedStudentIds);

  //fetch students
  useEffect(() => {
    fetchStudents();
  }, []);

  // delete student
  const handleDeleteStudents = async () => {
    if (selectedStudentIds.length === 0) {
      alert("Please select students to delete.");
      return;
    }

    try {
      const res = await deleteMultipleStudents(selectedStudentIds);
      console.log("Deleted students:", res.deletedStudentIds);

      // Fetch the updated list of students
      fetchStudents();

      // Clear the selected students
      setSelectedStudentIds([]);

      setShowSuccessAlert("Students deleted successfully");
    } catch (error) {
      console.error("Error deleting students:", error);
      setShowErrorAlert("Error deleting students");
    }
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(null); // Clear the success message when the alert is closed
    setShowErrorAlert(null); // Clear the error message when the alert is closed
  };

  // const handleDeleteStudent = async () => {
  //   try {
  //     const response = await axios.delete("/students", {
  //       data: { id: selectedStudentId },
  //     });
  //     console.log(response.data.message); // Display success message from the backend
  //     // You can perform additional actions, such as refreshing the list of students after deletion.
  //   } catch (error) {
  //     console.error(error.response.data.message); // Display error message from the backend
  //   }
  //   fetchStudents();
  // };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "index", headerName: "Index" },
    {
      field: "firstname",
      headerName: "FirstName",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastname",
      headerName: "LastName",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "email",
      flex: 1,
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

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="STUDENTS" subtitle="List of all students" />
        <Box>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleDeleteStudents}
          >
            Delete Students
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
      </Box>
      <Box
        m=" 0 0 0"
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
          selectionModel={selectedStudentIds}
          onSelectionModelChange={(ids) => setSelectedStudentIds(ids)}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Students;

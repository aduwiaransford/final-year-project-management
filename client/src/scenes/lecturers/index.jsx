import { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { LecturerContext } from "../../context/lecturerApi/LecturerApi";
import NotificationAlert from "../../components/NotificationAlert";

const Lecturers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedLectids, setSelectedLectids] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(null);

  const { lecturers, fetchLecturers, deleteMultipleLecturers } =
    useContext(LecturerContext);

  const handleDeleteLecturers = async () => {
    if (selectedLectids.length === 0) {
      alert("Please select students to delete.");
      return;
    }

    try {
      const res = await deleteMultipleLecturers(selectedLectids);
      console.log("Deleted students:", res.deletedLecturersids);

      // Fetch the updated list of students
      fetchLecturers();

      // Clear the selected students
      setSelectedLectids([]);

      setShowSuccessAlert("Lecturers deleted successfully");
    } catch (error) {
      console.error("Error deleting students:", error);
      setShowErrorAlert("Error deleting Lecturers");
    }
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(null); // Clear the success message when the alert is closed
    setShowErrorAlert(null); // Clear the error message when the alert is closed
  };

  const columns = [
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
      field: "contact",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
  ];

  useEffect(() => {
    fetchLecturers();
  }, []);

  return (
    <Box m="0 20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Lecturers" subtitle="List of Lecturers" />
        <Box>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleDeleteLecturers}
          >
            Delete Lecturers
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
          rows={lecturers}
          columns={columns}
          selectionModel={selectedLectids}
          onSelectionModelChange={(ids) => setSelectedLectids(ids)}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Lecturers;

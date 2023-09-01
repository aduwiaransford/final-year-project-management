import { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { LecturerContext } from "../../context/lecturerApi/LecturerApi";
import NotificationAlert from "../../components/NotificationAlert";
import { AuthContext } from "../../context/authContext/AuthContext";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import axios from "axios";

const Lecturers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useContext(AuthContext);
  const accessToken = user.data.accessToken;

  const [selectedLectids, setSelectedLectids] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(null);

  const [newPassword, setNewPassword] = useState("");

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

  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpenResetDialog = (userId) => {
    setSelectedUserId(userId);
    setResetDialogOpen(true);
  };

  const handleCloseResetDialog = () => {
    setSelectedUserId(null);
    setResetDialogOpen(false);
  };
  const handleResetPassword = async () => {
    try {
      const res = await axios.post(
        "https://aamusted-api.onrender.com/users/resetpassword",
        {
          userId: selectedUserId,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res.data);
      setShowSuccessAlert("Password reset successfully");
    } catch (error) {
      console.error("Error resetting password:", error);
      setShowErrorAlert("Error resetting password");
    }
    // Close the dialog after reset
    handleCloseResetDialog();
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
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 120,
      renderCell: (params) => {
        const isAdmin = params.row.isAdmin;

        const handleToggleChange = async () => {
          try {
            // Send a request to update the lecturer's isAdmin value
            const res = await axios.post("/users/toggleadmin", {
              id: params.row.id,
              isAdmin: !isAdmin,
            });

            // Fetch the updated list of lecturers
            console.log(res.data);
            fetchLecturers();
          } catch (error) {
            console.error("Error updating isAdmin value:", error);
            // Handle error if needed
          }
        };

        return (
          <div>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={handleToggleChange}
            />
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              className="productListEdit"
              onClick={() => handleOpenResetDialog(params.row.id)}
            >
              Reset
            </button>
            <Dialog
              open={resetDialogOpen && selectedUserId === params.row.id}
              onClose={handleCloseResetDialog}
              fullWidth
            >
              <DialogTitle>Reset User Password</DialogTitle>
              <DialogContent>
                <TextField
                  label="New Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseResetDialog} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleResetPassword} color="secondary">
                  Reset Password
                </Button>
              </DialogActions>
            </Dialog>
          </>
        );
      },
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

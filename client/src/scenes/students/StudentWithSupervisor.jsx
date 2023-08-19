import { useEffect, useState, useContext } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { StudentContext } from "../../context/studentApi/StudentContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import EditStudentDialog from "../../components/EditStudentDialog";

const StudentWithSupervisor = () => {
  const { students } = useContext(StudentContext);
  const { user } = useContext(AuthContext);

  const loggedUserId = user.data.id;
  const filteredStudents = students.filter((student) => {
    return student.supervisor === loggedUserId;
  });

  //edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Handler to open the edit dialog

  const navigate = useNavigate();
  const handleEditDialogOpen = (student) => {
    if (!student.projectTitle) {
      setSelectedStudent(student);
      setEditDialogOpen(true);
    } else {
      // Redirect to personal page when project title exists
      navigate(`/students/${student._id}`);
    }
  };

  const handleEditDialogClose = () => {
    setSelectedStudent(null);
    setEditDialogOpen(false);
  };

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
    {
      field: "action",
      headerName: "Action",
      width: 10,
      renderCell: (params) => {
        return (
          <button
            className="productListEdit"
            onClick={() => handleEditDialogOpen(params.row)}
          >
            Edit
          </button>
        );
      },
    },
    {
      field: "year",
      headerName: "Year",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="STUDENTS" subtitle="List of all students" />
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
          rows={filteredStudents}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      {editDialogOpen && selectedStudent && (
        <EditStudentDialog
          open={editDialogOpen}
          handleClose={handleEditDialogClose}
          student={selectedStudent}
        />
      )}
    </Box>
  );
};

export default StudentWithSupervisor;

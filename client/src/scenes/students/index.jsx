import { useState, useContext } from "react";
import axios from "axios";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { StudentContext } from "../../context/studentApi/StudentContext";

const Students = () => {
  const { students, fetchStudents } = useContext(StudentContext);
  const [selectedStudentId, setSelectedStudentId] = useState();
  console.log(selectedStudentId);

  // delete student
  const handleDeleteStudent = async () => {
    try {
      const response = await axios.delete("/students", {
        data: { id: selectedStudentId },
      });
      console.log(response.data.message); // Display success message from the backend
      // You can perform additional actions, such as refreshing the list of students after deletion.
    } catch (error) {
      console.error(error.response.data.message); // Display error message from the backend
    }
    fetchStudents();
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
            onClick={handleDeleteStudent}
          >
            Delete Student
          </Button>
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

export default Students;

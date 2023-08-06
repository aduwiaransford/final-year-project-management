import { useEffect, useState, useContext } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { StudentContext } from "../../context/studentApi/StudentContext";
import { AuthContext } from "../../context/authContext/AuthContext";

const StudentWithSupervisor = () => {
  const { students } = useContext(StudentContext);
  const { user } = useContext(AuthContext);

  const loggedUserId = user.data.id;
  console.log(loggedUserId);

  const filteredStudents = students.filter((student) => {
    return student.supervisor === loggedUserId;
  });

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
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/students/" + params.row._id,
                students: params.row,
              }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
          </>
        );
      },
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
    </Box>
  );
};

export default StudentWithSupervisor;
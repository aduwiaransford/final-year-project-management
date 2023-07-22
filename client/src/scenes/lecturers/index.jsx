import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Lecturers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  return (
    <Box m="20px">
      <Header title="Lecturers" subtitle="List of Lecturers" />
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
          rows={lecturers}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Lecturers;

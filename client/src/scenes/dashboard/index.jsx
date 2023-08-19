import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import SchoolIcon from "@mui/icons-material/School";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { StudentContext } from "../../context/studentApi/StudentContext";
import { LecturerContext } from "../../context/lecturerApi/LecturerApi";
import { ProjectContext } from "../../context/projectApi/ProjectContext";
import PieChart from "../../components/PieChart";
import { useContext, useEffect } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { categories, fetchCategories } = useContext(ProjectContext);
  const { students, studentsWithout, fetchStudentsWithout } =
    useContext(StudentContext);
  const { lecturers, fetchLecturers } = useContext(LecturerContext);
  useEffect(() => {
    fetchStudentsWithout();
    fetchLecturers();
    fetchCategories();
  }, []);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={students.length}
            subtitle="Total Students"
            icon={
              <SchoolIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={studentsWithout.length}
            subtitle="Unassigned Students"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={lecturers.length}
            subtitle="Lecturers"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={categories.length}
            subtitle="Project Categories"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <PieChart />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

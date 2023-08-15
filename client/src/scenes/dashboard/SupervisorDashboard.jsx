import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import SchoolIcon from "@mui/icons-material/School";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { StudentContext } from "../../context/studentApi/StudentContext";
import { ProjectContext } from "../../context/projectApi/ProjectContext";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";

const SupervisorDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useContext(AuthContext);

  const { categories, fetchCategories } = useContext(ProjectContext);
  const { students, studentsWithout, fetchStudentsWithout } =
    useContext(StudentContext);
  useEffect(() => {
    fetchStudentsWithout();
    fetchCategories();
  }, []);

  const loggedUserId = user.data.id;
  console.log(loggedUserId);

  const filteredStudents = students.filter((student) => {
    return student.supervisor === loggedUserId;
  });

  //total projects
  const totalProjects = filteredStudents.filter(
    (student) => student.projectTitle
  ).length;

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DASHBOARD"
          subtitle="Welcome to your supervisor dashboard"
        />
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
            title={filteredStudents.length}
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
            title={totalProjects}
            subtitle="Total Projects"
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
            title={categories.length}
            subtitle="Project Categories"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SupervisorDashboard;
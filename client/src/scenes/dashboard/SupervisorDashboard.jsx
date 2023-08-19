import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import SchoolIcon from "@mui/icons-material/School";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { StudentContext } from "../../context/studentApi/StudentContext";
import { ProjectContext } from "../../context/projectApi/ProjectContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { Select, MenuItem } from "@mui/material";

const SupervisorDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useContext(AuthContext);

  //filter by year
  const yearsArray = Array.from({ length: 18 }, (_, index) => 2023 + index);

  const [selectedYear, setSelectedYear] = useState(yearsArray[0]);

  const handleSelectYear = (event) => {
    const selectedYear = parseInt(event.target.value);
    setSelectedYear(selectedYear);
  };

  const { categories, fetchCategories } = useContext(ProjectContext);
  const { students, studentsWithout, fetchStudentsWithout } =
    useContext(StudentContext);
  useEffect(() => {
    fetchStudentsWithout();
    fetchCategories();
  }, []);

  const loggedUserId = user.data.id;
  console.log(loggedUserId);

  // Filter students based on the selected year
  const filteredStudents = students.filter((student) => {
    return student.supervisor === loggedUserId && student.year === selectedYear;
  });

  // Update total projects based on the filtered students
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

        <Box>
          <Select
            value={selectedYear}
            onChange={handleSelectYear}
            label="Select Year"
            MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
          >
            {yearsArray.map((year) => (
              <MenuItem key={year} value={year}>
                Year {year}
              </MenuItem>
            ))}
          </Select>
        </Box>
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

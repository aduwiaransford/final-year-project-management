import axios from "axios";
import Header from "../../components/Header";
import NotificationAlert from "../../components/NotificationAlert";
import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";
import "../../index.css";
import { StudentContext } from "../../context/studentApi/StudentContext";

const AddStudent = () => {
  const {
    addStudent,
    showSuccessAlert,
    setShowSuccessAlert,
    setShowErrorAlert,
    showErrorAlert,
    handleCloseAlert,
  } = useContext(StudentContext);

  const [formData, setFormData] = useState({
    index: "",
    firstname: "",
    lastname: "",
    contact: "",
    department: "",
    email: "",
    year: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(formData);
    // Optionally, you can reset the form fields after successful submission
    setFormData({
      index: "",
      firstname: "",
      lastname: "",
      contact: "",
      department: "",
      email: "",
      year: "",
    });
  };

  // File upload
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    const handleFileUpload = async () => {
      if (!selectedFile) {
        alert("Please select a file.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const res = await axios.post("/students/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // Handle success response here (e.g., show success message)
        setShowSuccessAlert(true);
        console.log(res.data);
      } catch (error) {
        // Handle error response here (e.g., show error message)
        setShowErrorAlert(true);
        console.log(error.response.data);
      }
    };

    if (selectedFile) {
      handleFileUpload();
    }
  }, [selectedFile]);

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", margin: "20px" }}
    >
      <Box display="flex" justifyContent="space-between">
        {" "}
        {/* Update justifyContent */}
        <Header title="ADD STUDENT" subtitle="Add new stdudent data" />
        <Box>
          <label htmlFor="file-upload" className="import-label">
            Import Students
          </label>
          <input
            type="file"
            id="file-upload"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            name="firstname"
            label="First Name"
            value={formData.firstname}
            onChange={handleFormChange}
            margin="normal"
            required
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="lastname"
            label="Last Name"
            value={formData.lastname}
            onChange={handleFormChange}
            margin="normal"
            required
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="index"
            label="Index Number"
            value={formData.index}
            onChange={handleFormChange}
            margin="normal"
            required
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="email"
            label="email"
            value={formData.email}
            onChange={handleFormChange}
            margin="normal"
            required
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name="contact"
            label="Contact"
            value={formData.contact}
            onChange={handleFormChange}
            margin="normal"
            required
            variant="filled"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            name="year"
            label="year"
            value={formData.year}
            onChange={handleFormChange}
            margin="normal"
            required
            variant="filled"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6} mt={2}>
          <FormControl fullWidth required>
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={formData.department}
              onChange={handleFormChange}
              variant="filled"
            >
              <MenuItem value="Information Technology">
                Information Technology
              </MenuItem>
              <MenuItem value="Hospitality">Hospitality</MenuItem>
              <MenuItem value="Accounting">Accounting</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="end" m="20px">
        <Button
          onClick={handleSubmit}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Create New Student
        </Button>
        {/* Success Alert */}
        <NotificationAlert
          open={showSuccessAlert}
          message="Student created successfully!"
          severity="success"
          onClose={handleCloseAlert}
        />

        {/* Error Alert */}
        <NotificationAlert
          open={showErrorAlert}
          message="Failed to create Student!"
          severity="error"
          onClose={handleCloseAlert}
        />
      </Box>
    </Box>
  );
};

export default AddStudent;

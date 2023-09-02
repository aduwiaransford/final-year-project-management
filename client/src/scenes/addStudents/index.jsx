import React, { useState, useEffect, useContext } from "react";
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
import Header from "../../components/Header";
import NotificationAlert from "../../components/NotificationAlert";
import axios from "axios";

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

  const [errors, setErrors] = useState({}); // Initialize errors object

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    // Check for numeric input for the "Index Number"
    if (name === "index") {
      if (value === "" || /^\d+$/.test(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Index Number must be numeric",
        }));
      }
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {}; // Create a new errors object for this submission

    // Check for errors in each field
    if (!formData.index) {
      formErrors.index = "Index Number is required";
    }
    if (!formData.firstname) {
      formErrors.firstname = "First Name is required";
    }
    if (!formData.lastname) {
      formErrors.lastname = "Last Name is required";
    }
    if (!formData.contact) {
      formErrors.contact = "Contact is required";
    }
    if (!formData.department) {
      formErrors.department = "Department is required";
    }
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      formErrors.email = "Invalid email format";
    }
    if (!formData.year) {
      formErrors.year = "Year is required";
    }

    // Check if there are any errors
    if (Object.keys(formErrors).length === 0) {
      // If no errors, submit the form
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
    } else {
      // If there are errors, update the errors state
      setErrors(formErrors);
    }
  };

  // Helper function to validate email format
  const isValidEmail = (email) => {
    // You can use a regular expression or a library like 'validator' for more robust email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
        const res = await axios.post(
          "https://aamusted-api.onrender.com/students/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
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
        <Header title="ADD STUDENT" subtitle="Add new student data" />
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
            error={!!errors.index}
            helperText={errors.index}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleFormChange}
            margin="normal"
            required
            variant="filled"
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
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
            label="Year"
            value={formData.year}
            onChange={handleFormChange}
            margin="normal"
            required
            variant="filled"
            fullWidth
            error={!!errors.year}
            helperText={errors.year}
          />
        </Grid>
        <Grid item xs={12} md={6} mt={2}>
          <FormControl fullWidth required error={!!errors.department}>
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={formData.department}
              onChange={handleFormChange}
              variant="filled"
            >
              <MenuItem value="Information Technology">
                B.Sc. Information Technology
              </MenuItem>
              <MenuItem value="Hospitality">
                B. Sc. Catering and Hospitality Education
              </MenuItem>
              <MenuItem value="Accounting">
                B. Sc. Accounting Education
              </MenuItem>
              <MenuItem value="Economics">B. Sc. Economics Education</MenuItem>
              <MenuItem value="Mathematics">
                B. Sc. Mathematics Education
              </MenuItem>
            </Select>
            <Box sx={{ color: "red" }}>{errors.department}</Box>
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

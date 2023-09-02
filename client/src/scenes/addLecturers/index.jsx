import React, { useState, useContext } from "react";
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
import { AuthContext } from "../../context/authContext/AuthContext";
import Header from "../../components/Header";
import NotificationAlert from "../../components/NotificationAlert";
import axios from "axios";

const AddLecturer = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    contact: "",
    password: "",
    department: "",
  });

  const [errors, setErrors] = useState({}); // Initialize errors object

  const { user } = useContext(AuthContext);
  const accessToken = user?.data.accessToken;

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear any previous errors for this field when the input changes
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {}; // Create a new errors object for this submission

    // Check for errors in each field
    if (!formData.firstname) {
      formErrors.firstname = "First Name is required";
    }
    if (!formData.lastname) {
      formErrors.lastname = "Last Name is required";
    }
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      formErrors.email = "Invalid email format";
    }
    if (!formData.contact) {
      formErrors.contact = "Contact is required";
    }
    if (!formData.department) {
      formErrors.department = "Department is required";
    }
    if (!formData.password) {
      formErrors.password = "Password is required";
    }

    // Check if there are any errors
    if (Object.keys(formErrors).length === 0) {
      // If no errors, submit the form
      try {
        const res = await axios.post(
          "https://aamusted-api.onrender.com/users",
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setShowSuccessAlert(true);
        console.log(res.data); // The response from the server (e.g., success message)

        // Reset the form fields after successful submission
        setFormData({
          email: "",
          firstname: "",
          lastname: "",
          contact: "",
          password: "",
          department: "",
        });
      } catch (error) {
        setShowErrorAlert(true);
        console.error("Error creating user:", error.response.data);
        // Handle errors here (e.g., show error message to the user)
      }
    } else {
      // If there are errors, update the errors state
      setErrors(formErrors);
    }
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  // Helper function to validate email format
  const isValidEmail = (email) => {
    // You can use a regular expression or a library like 'validator' for more robust email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", margin: "20px" }}
    >
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
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
            error={!!errors.firstname} // Check if there's an error for this field
            helperText={errors.firstname} // Display the error message if there is one
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
            error={!!errors.lastname} // Check if there's an error for this field
            helperText={errors.lastname} // Display the error message if there is one
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="email"
            label="Email"
            value={formData.email.toLowerCase()}
            onChange={handleFormChange}
            margin="normal"
            required
            variant="filled"
            fullWidth
            error={!!errors.email} // Check if there's an error for this field
            helperText={errors.email} // Display the error message if there is one
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="contact"
            label="Contact"
            value={formData.contact}
            onChange={handleFormChange}
            margin="normal"
            required
            variant="filled"
            fullWidth
            error={!!errors.contact} // Check if there's an error for this field
            helperText={errors.contact} // Display the error message if there is one
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
                Information Technology
              </MenuItem>
              <MenuItem value="Hospitality">Hospitality</MenuItem>
              <MenuItem value="Accounting">Accounting</MenuItem>
            </Select>
            <Box sx={{ color: "red" }}>{errors.department}</Box>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleFormChange}
            margin="normal"
            type="password"
            required
            variant="filled"
            fullWidth
            error={!!errors.password} // Check if there's an error for this field
            helperText={errors.password} // Display the error message if there is one
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="end" m="20px">
        <Button
          onClick={handleSubmit}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Create New User
        </Button>
        {/* Success Alert */}
        <NotificationAlert
          open={showSuccessAlert}
          message="Lecturer created successfully!"
          severity="success"
          onClose={handleCloseAlert}
        />

        {/* Error Alert */}
        <NotificationAlert
          open={showErrorAlert}
          message="Failed to create Lecturer!"
          severity="error"
          onClose={handleCloseAlert}
        />
      </Box>
    </Box>
  );
};

export default AddLecturer;

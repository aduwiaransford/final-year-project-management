import axios from "axios";
import Header from "../../components/Header";
import NotificationAlert from "../../components/NotificationAlert";
import { useState, useContext } from "react";
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
import { AuthContext } from "../../context/authContext/AuthContext";

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

  const { user } = useContext(AuthContext);
  const accessToken = user?.data.accessToken;

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post("/users", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
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

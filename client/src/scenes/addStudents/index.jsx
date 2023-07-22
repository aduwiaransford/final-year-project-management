import axios from "axios";
import Header from "../../components/Header";
import NotificationAlert from "../../components/NotificationAlert";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import "../../index.css";

const AddStudent = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [formData, setFormData] = useState({
    index: "",
    firstname: "",
    lastname: "",
    contact: "",
    department: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post("/students", formData, {
        headers: {
          // Include any headers you need for authentication (if applicable)
        },
      });
      setShowSuccessAlert(true);
      console.log(res.data); // The response from the server (e.g., success message)

      // Reset the form fields after successful submission
      setFormData({
        index: "",
        firstname: "",
        lastname: "",
        contact: "",
        department: "",
      });
    } catch (error) {
      // Handle errors here (e.g., show error message to the user)
      setShowErrorAlert(true);
      console.error("Error creating user:", error.response.data);
    }
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  // File upload
  const [selectedFile, setSelectedFile] = useState(null);

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
      } catch (error) {
        // Handle error response here (e.g., show error message)
        setShowErrorAlert(true);
      }
    };

    if (selectedFile) {
      handleFileUpload();
    }
  }, [selectedFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", margin: "20px" }}
    >
      <Header title="ADD STUDENT" subtitle="Add new stdudent data" />
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <label className="import-lable" htmlFor="file-upload">
          Import Students
        </label>
        <input
          type="file"
          id="file-upload"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Box>
      <TextField
        name="index"
        label="index number"
        value={formData.index}
        onChange={handleFormChange}
        margin="normal"
        required
        variant="filled"
      />
      <TextField
        name="firstname"
        label="First Name"
        value={formData.firstname}
        onChange={handleFormChange}
        margin="normal"
        required
        variant="filled"
      />
      <TextField
        name="lastname"
        label="Last Name"
        value={formData.lastname}
        onChange={handleFormChange}
        margin="normal"
        required
        variant="filled"
      />
      <TextField
        name="contact"
        label="Contact"
        value={formData.contact}
        onChange={handleFormChange}
        margin="normal"
        required
        variant="filled"
      />

      <FormControl sx={{ minWidth: 120 }} margin="normal" required>
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

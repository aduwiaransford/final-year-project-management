import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ProjectContext } from "../context/projectApi/ProjectContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const EditStudentDialog = ({ open, handleClose, student }) => {
  const [projectTopic, setProjectTopic] = useState("");
  const [projectCategory, setProjectCategory] = useState("");

  const { fetchCategories, categories, addProjectTitle } =
    useContext(ProjectContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      // Perform logic to update student details, including project topic and category
      // Call an API endpoint to update the student's project details

      // Add project title
      await addProjectTitle(student.id, projectTopic, projectCategory);

      // After logic is complete, navigate to student's personal page
      navigate(`/students/${student._id}`);
      handleClose(); // Close the dialog
    } catch (error) {
      console.error("Error saving student details:", error);
      // Handle errors here (e.g., show error message to the user)
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Student Details</DialogTitle>
      <DialogContent>
        <TextField
          label="Project Topic"
          value={projectTopic}
          onChange={(e) => setProjectTopic(e.target.value)}
          fullWidth
          margin="normal"
        />
        {/* Add input for project category */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Project Category</InputLabel>
          <Select
            value={projectCategory}
            onChange={(e) => setProjectCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="secondary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudentDialog;

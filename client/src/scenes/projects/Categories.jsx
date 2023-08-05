import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { ProjectContext } from "../../context/projectApi/ProjectContext";
import { Box, Typography, TextField, Button } from "@mui/material";

const Categories = () => {
  const { fetchCategories, categories, createCategory } =
    useContext(ProjectContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const [newCategoryName, setNewCategoryName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategoryName.trim() !== "") {
      createCategory(newCategoryName);
      setNewCategoryName("");
    }
  };

  return (
    <Box m="20px">
      <Header title="Categories" subtitle="List of Categories" />
      <Box m="40px" height="75vh">
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          <ul>
            {categories.map((category) => (
              <li key={category._id}>{category.name}</li>
            ))}
          </ul>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            name="categoryName"
            label="add category"
            value={newCategoryName}
            margin="normal"
            required
            variant="filled"
            fullWidth
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Box display="flex" justifyContent="end" m="20px">
            <Button type="submit" color="secondary" variant="contained">
              Add Category
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Categories;

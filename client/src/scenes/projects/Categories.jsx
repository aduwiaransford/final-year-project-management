import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import "../../index.css";

const Categories = () => {
  const [categories, setCategories] = useState([]); // State for categories
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/projects");
      const categoriesWithId = res.data.map((category) => ({
        ...category,
        id: category._id,
      }));
      setCategories(categoriesWithId);
    } catch (error) {
      console.error("Error fetching category data:", error.response.data);
      // Handle errors here (e.g., show error message to the user)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newCategoryName.trim() !== "") {
      try {
        const res = await axios.post("/projects", { name: newCategoryName });
        const newCategory = {
          ...res.data,
          id: res.data._id,
        };
        setCategories([...categories, newCategory]);
        setNewCategoryName("");
      } catch (error) {
        console.error("Error creating category:", error.response.data);
        // Handle errors here (e.g., show error message to the user)
      }
    }
  };

  const handlecheckClick = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      const res = await axios.delete("/projects", { data: { id } });

      fetchCategories();
    }
  };
  return (
    <Box m="20px">
      <Header title="Categories" subtitle="List of Categories" />
      <Box m="40px" height="75vh">
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          <ul className="category-list">
            {categories.map((category) => (
              <li
                key={category._id}
                className="category-item"
                // onClick={() => handleDelete(category.id)} // Use 'id' instead of '_id'
                onClick={() => handlecheckClick(category.id)}
              >
                {category.name}
              </li>
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

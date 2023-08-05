// LecturerContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("/projects");
            const categoriesWithId = res.data.map((category) => ({
                ...category,
                id: category._id, // Add the id property using the _id field from the backend
            }));
            setCategories(categoriesWithId);
        } catch (error) {
            console.error("Error fetching category data:", error.response.data);
            // Handle errors here (e.g., show error message to the user)
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const createCategory = async (name) => {
        try {
            const res = await axios.post("/projects", { name });
            const newCategory = {
                ...res.data,
                id: res.data._id,
            };
            setCategories([...categories, newCategory]);
        } catch (error) {
            console.error("Error creating category:", error.response.data);
            // Handle errors here (e.g., show error message to the user)
        }
    };
    // chapters
    const [chapters, setChapters] = useState([]);

    const fetchChapters = async () => {
        try {
            const res = await axios.get("/chapters");
            const chaptersWithId = res.data.map((chapter) => ({
                ...chapter,
                id: chapter._id,
            }));
            setChapters(chaptersWithId);
        } catch (error) {
            console.error("Error fetching chapter data:", error.response.data);
            // Handle errors here (e.g., show error message to the user)
        }
    };

    useEffect(() => {
        fetchChapters();
    }, []);

    const addChapter = async (chapterData) => {
        try {
            const res = await axios.post("/chapters", chapterData);
            const newChapter = {
                ...res.data,
                id: res.data._id,
            };
            setChapters((prevChapters) => [...prevChapters, newChapter]);
        } catch (error) {
            console.error("Error creating chapter:", error.response.data);
            // Handle errors here (e.g., show error message to the user)
        }
    };

    const updateChapter = async (chapterId, chapterData) => {
        try {
            await axios.put(`/chapters/${chapterId}`, chapterData);
            setChapters((prevChapters) =>
                prevChapters.map((chapter) =>
                    chapter.id === chapterId ? { ...chapter, ...chapterData } : chapter
                )
            );
        } catch (error) {
            console.error("Error updating chapter:", error.response.data);
            // Handle errors here (e.g., show error message to the user)
        }
    };



    return (
        <ProjectContext.Provider
            value={{
                fetchCategories,
                categories,
                createCategory,
                addChapter,
                updateChapter

            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

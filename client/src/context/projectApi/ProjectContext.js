// ProjectContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [chapters, setChapters] = useState([]);

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

    const fetchChaptersByStudentId = async (studentId) => {
        try {
            const res = await axios.get(`projects/chapters/${studentId}`);
            setChapters(res.data);
        } catch (error) {
            console.error("Error fetching chapters:", error.response.data);
            // Handle errors here (e.g., show error message to the user)
        }
    };

    const createOrUpdateChapter = async (chapterData) => {
        try {
            const res = await axios.post("/projects/chapters", chapterData);
            const newChapter = {
                ...res.data,
                id: res.data._id,
            };
            setChapters([...chapters, newChapter]);
        } catch (error) {
            console.error("Error creating or updating chapter:", error.response.data);
            // Handle errors here (e.g., show error message to the user)
        }
    };

    const [summaryReport, setSummaryReport] = useState(null);

    // Function to fetch the summary report from the backend
    const fetchSummaryReport = async (id) => {
        try {
            const res = await axios.get(`/projects/summary/${id}`);
            setSummaryReport(res.data);
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching summary report:", error.response.data);
            // Handle errors here (e.g., show error message to the user)
        }
    };

    return (
        <ProjectContext.Provider
            value={{
                fetchCategories,
                categories,
                createCategory,
                fetchChaptersByStudentId,
                chapters,
                createOrUpdateChapter,
                fetchSummaryReport,
                summaryReport
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

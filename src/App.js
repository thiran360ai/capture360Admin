import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CustomCard from "./components/CustomCard";
import LoginPage from "./components/LoginPage";
import DataPage from "./components/DataPage";
import PlanDetailsPage from "./components/PlanDetailsPage";
import PlanDetailViewPage from "./components/PlanDetailViewPage";
import CreateDataPage from "./components/CreateDataPage";
import ImageGalleryComponent from "./components/ImageGalleryComponent";
import ImageViewPage from "./components/ImageViewPage";
import CreatePlanDataPage from "./components/CreatePlanDataPage";
import VidPage from "./components/VidPage";
import ProjectTable from "./components/ProjectTable";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "./App.css";

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
  },
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [totalProjects, setTotalProjects] = useState(0);
  const [liveProjects, setLiveProjects] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [liveEmployees, setLiveEmployees] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(
          "https://4aae-157-49-242-245.ngrok-free.app/building/projectlist/",
          {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "98547",
            },
          }
        );
        const data = await response.json();
        setTotalProjects(data.length);
        setLiveProjects(data.filter(project => project.status === "live").length); // Assuming "status" field determines if a project is live
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      }
    };

    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(
          "https://4aae-157-49-242-245.ngrok-free.app/building/create_user/",
          {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "98547",
            },
          }
        );
        const data = await response.json();
        setTotalEmployees(data.length);
        setLiveEmployees(data.filter(employee => employee.status === "live").length); // Assuming "status" field determines if an employee is live
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      }
    };

    fetchProjectData();
    fetchEmployeeData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          {isLoggedIn ? (
            <>
              <div className="main-container">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="content">
                  <div className="top-bar">
                    <div className="right-side">
                      <input type="text" className="search-bar" placeholder="Search..." />
                      <div className="profile">Profile</div>
                    </div>
                  </div>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <>
                          <div className="card-container">
                            <CustomCard
                              title="Total Project"
                              count={totalProjects}
                            />
                            <CustomCard
                              title="Live Project"
                              count={totalProjects}
                            />
                            <CustomCard
                              title="Total Employee"
                              count={totalEmployees}
                            />
                            <CustomCard
                              title="Live Employee"
                              count={totalEmployees}
                            />
                          </div>
                          <ProjectTable />
                        </>
                      }
                    />
                    <Route path="/data" element={<DataPage />} />
                    <Route path="/plan-details" element={<PlanDetailsPage />} />
                    <Route path="/plan-detail-view" element={<PlanDetailViewPage />} />
                    <Route path="/create" element={<CreateDataPage />} />
                    <Route path="/project-manager" element={<DataPage />} />
                    <Route path="/create-manager" element={<DataPage />} />
                    <Route path="/image-gallery" element={<ImageGalleryComponent />} />
                    <Route path="/image-view" element={<ImageViewPage />} />
                    <Route path="/create-plan" element={<CreatePlanDataPage />} />
                    <Route path="/vid" element={<VidPage />} />
                  </Routes>
                </div>
              </div>
            </>
          ) : (
            <LoginPage onLoginSuccess={handleLoginSuccess} />
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;

// src/App.js
import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CustomCard from "./components/CustomCard";
import LoginPage from "./LoginPage";
import DataPage from "./components/DataPage";
import ImageViewPage from "./components/ImageViewPage";
import CreateDataPage from "./components/CreateDataPage";
import CreatePlanDataPage from "./components/CreatePlanDataPage";
import ImageSizeDisplay from "./components/ImageSizeDisplay"; // Import new component
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <>
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="content">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="card-container">
                      <CustomCard
                        title="ProjectList"
                        content="Content for ProjectList"
                        apiEndpoint="https://e7ff-157-46-95-165.ngrok-free.app/building/projectlist/"
                        onCreateData={() => {}}
                      />
                      <CustomCard
                        title="Plan_Details"
                        content="Content for Plan_Details"
                        apiEndpoint="https://e7ff-157-46-95-165.ngrok-free.app/building/plan_details/"
                        onCreateData={() => {}}
                      />
                      <CustomCard
                        title="Create_user"
                        content="Content for Create_user"
                        apiEndpoint="https://e7ff-157-46-95-165.ngrok-free.app/building/create_user/"
                      />
                    </div>
                  }
                />
                <Route path="/data" element={<DataPage />} />
                <Route path="/view" element={<ImageViewPage />} />
                <Route path="/create" element={<CreateDataPage />} />
                <Route path="/create-plan" element={<CreatePlanDataPage />} />
                <Route
                  path="/image-size-display"
                  element={<ImageSizeDisplay imageUrl="https://example.com/sample.jpg" />} // Replace with your actual image URL
                />
              </Routes>
            </div>
          </>
        ) : (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </Router>
  );
};

export default App;

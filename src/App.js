import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CustomCard from './components/CustomCard';
import LoginPage from './LoginPage';
import DataPage from './components/DataPage';
import ProjectDetailsPage from './components/ProjectDetailsPage';
import './App.css';

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
                <Route path="/" element={
                  <div className="card-container">
                    <CustomCard
                      title="ProjectList"
                      content="Content for ProjectList"
                      apiEndpoint="https://9677-2401-4900-67a5-542e-617b-b73b-dcf1-e3ab.ngrok-free.app/building/projectlist/"
                    />
                    <CustomCard
                      title="Plan_Details"
                      content="Content for Plan_Details"
                      apiEndpoint="https://9677-2401-4900-67a5-542e-617b-b73b-dcf1-e3ab.ngrok-free.app/building/plan_details/"
                    />
                    <CustomCard
                      title="Create_user"
                      content="Content for Create_user"
                      apiEndpoint="https://9677-2401-4900-67a5-542e-617b-b73b-dcf1-e3ab.ngrok-free.app/building/create_user/"
                    />
                  </div>
                } />
                <Route path="/data" element={<DataPage />} />
                <Route path="/project-details" element={<ProjectDetailsPage />} />
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

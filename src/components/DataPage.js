import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import CreateDataPage from "./CreateDataPage";
import { Box, Card, CardContent } from "@mui/material";
import "./DataPage.css";

const DataPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, apiEndpoint } = location.state || {};
  const [fetchedData, setFetchedData] = useState(null);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);

  useEffect(() => {
    if (apiEndpoint) {
      const fetchData = async () => {
        try {
          const response = await fetch(apiEndpoint, {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "98547",
            },
          });
          const jsonData = await response.json();
          setFetchedData(jsonData);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
      fetchData();
    }
  }, [apiEndpoint]);

<<<<<<< HEAD
=======
  const renderImage = (imageUrl, name) => {
    const url = `https://5c55-2409-408d-1e08-1bc8-9c9d-bdc6-29a1-7760.ngrok-free.app/${imageUrl}`;
    console.log("URL", url);
    return (
      <img
        src={url}
        alt={name}
        style={{
          width: "100px",
          height: "auto",
          cursor: "pointer",
          transition: "transform 0.3s",
        }}
        onClick={() => navigate("/view", { state: { imageUrl, name } })}
      />
    );
  };

>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
  const handleView = async (row) => {
    if (!row.project) {
      console.error("Project ID is missing:", row);
      return;
    }

    try {
<<<<<<< HEAD
      const viewUrl = `https://3973-2409-4072-6e8f-befe-7c12-7ad2-88f1-629a.ngrok-free.app/building/plans/project/${row.project}/`;
=======
      const viewUrl = `https://5c55-2409-408d-1e08-1bc8-9c9d-bdc6-29a1-7760.ngrok-free.app/building/plans/project/${row.project}/`;
      console.log("Fetching view data from:", viewUrl);
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
      const response = await fetch(viewUrl, {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "98547",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
<<<<<<< HEAD
      navigate("/plan-details", {
        state: { title: `Plan Details for Project ${row.project}`, data },
      });
=======
      console.log("Fetched view data:", data);
      navigate("/data", `{ state: { title: Project ${row.project}, data, apiEndpoint: viewUrl } }`);
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
    } catch (error) {
      console.error("Failed to fetch view data:", error);
    }
  };

  const renderImage = (imageUrl, name) => {
    const url = `https://3973-2409-4072-6e8f-befe-7c12-7ad2-88f1-629a.ngrok-free.app${imageUrl}`;
    return (
      <img
        src={url}
        alt={name}
        style={{ width: "100px", height: "auto", cursor: "pointer" }}
        onClick={() =>
          navigate("/image-view", { state: { imageUrl: url, name } })
        }
      />
    );
  };

  const openCreateDrawer = () => {
    setIsCreateDrawerOpen(true);
  };

  const closeCreateDrawer = () => {
    setIsCreateDrawerOpen(false);
  };

  return (
<<<<<<< HEAD
    <Card style={{width: '1100px',height:'650px' ,boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', paddingTop: '20px', overflow: 'auto',
      // backgroundColor: '#eceff1'
    }}>
      <CardContent style={{}}>
        <Typography variant="h4" gutterBottom style={{ color: "#00509e",fontWeight:'bold',paddingLeft: '20px' }}>
          {title}
        </Typography>
        <Box
          className="button-container"
          style={{ marginLeft: "80%", justifyContent: "flex-end" }}
        >
          <Button variant="contained" color="primary" onClick={openCreateDrawer}  
          style={{color: "#ffffff", margin: "10px 0", borderRadius: 4 }}>
            Create Project
          </Button>
        </Box>

        {fetchedData ? (
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(fetchedData[0]).map((key, index) => (
                  <TableCell key={index} style={{ fontSize: '20px', fontWeight: 'bold' }}>{key}</TableCell>
                ))}
                <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchedData.map((row, index) => (
                <TableRow key={index}>
                  {Object.entries(row).map(([key, value], idx) => (
                    <TableCell key={idx} style={{ fontSize: '18px', }}>
                      {key === "image"
                        ? renderImage(value, row.name)
                        : value}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleView(row)}
                      style={{ width: "180px", color: "#ffffff", margin: "10px 0", borderRadius: 9 }}
                    >
                      View Floor_Data
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
        <Drawer anchor="right" open={isCreateDrawerOpen} onClose={closeCreateDrawer}>
          <CreateDataPage onClose={closeCreateDrawer} />
        </Drawer>
      </CardContent>
    </Card>
=======
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "1500px",
        margin: "20px auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {fetchedData ? (
        <Table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <TableHead style={{ backgroundColor: "#007bff", color: "white" }}>
            <TableRow>
              {Object.keys(fetchedData[0]).map((key, index) => (
                <TableCell key={index} style={{ padding: "20px", textAlign: "left", fontWeight: "bold", color: "white" }}>
                  {key}
                </TableCell>
              ))}
              <TableCell style={{ padding: "20px", textAlign: "left", fontWeight: "bold", color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedData.map((row, index) => (
              <TableRow key={index} style={{ transition: "background-color 0.3s" }}>
                {Object.entries(row).map(([key, value], idx) => (
                  <TableCell key={idx} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {key === "image" ? renderImage(value, row.name) : value}
                  </TableCell>
                ))}
                <TableCell style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      backgroundColor: "#6c757d",
                      color: "white",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    onClick={() => handleView(row)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>Loading data...</Typography>
      )}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </div>
    </div>
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
  );
};

export default DataPage;
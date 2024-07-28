import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const DataPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, data, apiEndpoint } = location.state || {};
  const [fetchedData, setFetchedData] = useState(data || null);

  useEffect(() => {
    if (apiEndpoint) {
      const fetchData = async () => {
        try {
          console.log("Fetching data from:", apiEndpoint);
          const response = await fetch(apiEndpoint, {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "98547",
            },
          });
          const jsonData = await response.json();
          console.log("Fetched data:", jsonData);
          setFetchedData(jsonData);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
      fetchData();
    }
  }, [apiEndpoint]);

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

  const handleView = async (row) => {
    if (!row.project) {
      console.error("Project ID is missing:", row);
      return;
    }

    try {
      const viewUrl = `https://5c55-2409-408d-1e08-1bc8-9c9d-bdc6-29a1-7760.ngrok-free.app/building/plans/project/${row.project}/`;
      console.log("Fetching view data from:", viewUrl);
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
      console.log("Fetched view data:", data);
      navigate("/data", `{ state: { title: Project ${row.project}, data, apiEndpoint: viewUrl } }`);
    } catch (error) {
      console.error("Failed to fetch view data:", error);
    }
  };

  return (
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
  );
};

export default DataPage;
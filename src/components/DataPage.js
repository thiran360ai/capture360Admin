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
    const url = `https://e7ff-157-46-95-165.ngrok-free.app${imageUrl}`;
    console.log("URL",url);
    return (
      <img
        src={url}
        alt={name}
        style={{ width: "100px", height: "auto", cursor: "pointer" }}
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
      const viewUrl = `https://e7ff-157-46-95-165.ngrok-free.app/building/plans/project/${row.project}/`;
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
      navigate("/data", { state: { title: `Project ${row.project}`, data, apiEndpoint: viewUrl } });
    } catch (error) {
      console.error("Failed to fetch view data:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {fetchedData ? (
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(fetchedData[0]).map((key, index) => (
                <TableCell key={index}>{key}</TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedData.map((row, index) => (
              <TableRow key={index}>
                {Object.entries(row).map(([key, value], idx) => (
                  <TableCell key={idx}>
                    {key === "image" ? renderImage(value, row.name) : value}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.history.back()}
      >
        Back
      </Button>
    </div>
  );
};

export default DataPage;

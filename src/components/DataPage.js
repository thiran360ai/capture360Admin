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
    if (!fetchedData && apiEndpoint) {
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
  }, [apiEndpoint, fetchedData]);

  const renderImage = (imageUrl, name) => {
    const url = `https://6ca3-171-79-56-179.ngrok-free.app${imageUrl}`;
    return <img src={url} alt={name} style={{ width: "100px", height: "auto" }} />;
  };

  const handleViewClick = (plan_id) => {
    let planEndpoint = "";
    if (plan_id === 1) {
      planEndpoint = "https://9677-2401-4900-67a5-542e-617b-b73b-dcf1-e3ab.ngrok-free.app/building/plans/project/1/";
    } else if (plan_id === 2) {
      planEndpoint = "https://9677-2401-4900-67a5-542e-617b-b73b-dcf1-e3ab.ngrok-free.app/building/plans/project/2/";
    }
    navigate('/project-details', { state: { plan_id, planEndpoint } });
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
              <TableCell>Actions</TableCell>
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
                    color="primary"
                    onClick={() => handleViewClick(row.plan_id)}
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

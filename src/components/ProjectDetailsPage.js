import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const ProjectDetailsPage = () => {
  const location = useLocation();
  const { plan_id, planEndpoint } = location.state || {};
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    if (planEndpoint) {
      const fetchProjectData = async () => {
        try {
          const response = await fetch(planEndpoint, {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "98547",
            },
          });
          const jsonData = await response.json();
          setProjectData(jsonData);
        } catch (error) {
          console.error("Failed to fetch project data:", error);
        }
      };
      fetchProjectData();
    }
  }, [planEndpoint]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Project Details for Plan ID: {plan_id}
      </Typography>
      {projectData ? (
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(projectData[0]).map((key, index) => (
                <TableCell key={index}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {projectData.map((row, index) => (
              <TableRow key={index}>
                {Object.entries(row).map(([key, value], idx) => (
                  <TableCell key={idx}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>Loading project data...</Typography>
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

export default ProjectDetailsPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const CustomCard = ({ title, content, apiEndpoint, onCreateData }) => {
  const navigate = useNavigate();

  const handleFetchData = async () => {
    try {
      const response = await fetch(apiEndpoint, {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "98547",
        },
      });
      const data = await response.json();
      navigate("/data", { state: { title, data, apiEndpoint } });
    } catch (error) {
      console.error(`Failed to fetch ${title} data:`, error);
    }
  };

  return (
    <Card style={{ margin: "20px", minWidth: "200px" }}>
      <CardContent>
        <Typography variant="h5" >{title}</Typography>
        <Typography variant="body2">{content}</Typography>
        <Button variant="contained" color="primary" onClick={handleFetchData}>
          Fetch Data
        </Button>
        {onCreateData && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/create-plan")}
          >
            Create Data
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
